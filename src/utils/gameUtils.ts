import { CURRENCY_DATA, CurrencyType, MoneyItem } from '../types/Currency'
import { TotalCountRound, GiveChangeRound, CurrencyConvertRound, GameLevel } from '../types/GameTypes'

const LEVEL_RANGES: Record<GameLevel, { min: number, max: number }> = {
  Easy: { min: 1, max: 200 },
  Medium: { min: 1, max: 500 },
  Hard: { min: 1, max: 2000 }
}

export function generateTotalCountRound(currency: CurrencyType, level: GameLevel = 'Easy'): TotalCountRound {
  const range = LEVEL_RANGES[level]
  const currencyItems = CURRENCY_DATA[currency].filter(item => item.type === 'bill')
  
  // Adjust number of items based on level
  const numItems = level === 'Hard' 
    ? Math.floor(Math.random() * 4) + 6  // 6-9 items for hard mode
    : level === 'Medium'
      ? Math.floor(Math.random() * 3) + 4  // 4-6 items for medium mode
      : Math.floor(Math.random() * 2) + 3  // 3-4 items for easy mode

  const selectedItems: MoneyItem[] = []
  let total = 0
  let attempts = 0
  const maxAttempts = 20

  while (attempts < maxAttempts) {
    selectedItems.length = 0
    total = 0

    // For hard mode, ensure we use a mix of different bills
    if (level === 'Hard') {
      const usedValues = new Set<number>()
      for (let i = 0; i < numItems; i++) {
        // Try to use different bill values
        const availableItems = currencyItems.filter(item => !usedValues.has(item.value))
        const randomItem = availableItems.length > 0 
          ? availableItems[Math.floor(Math.random() * availableItems.length)]
          : currencyItems[Math.floor(Math.random() * currencyItems.length)]
        
        selectedItems.push(randomItem)
        usedValues.add(randomItem.value)
        total += randomItem.value
      }
    } else {
      // For easy and medium, allow repeated bills
      for (let i = 0; i < numItems; i++) {
        const randomItem = currencyItems[Math.floor(Math.random() * currencyItems.length)]
        selectedItems.push(randomItem)
        total += randomItem.value
      }
    }

    // Only break if we have a valid total within range
    if (total >= range.min && total <= range.max) {
      break
    }
    attempts++
  }

  // If we couldn't find a valid combination, generate a new one with smaller bills
  if (total < range.min || total > range.max) {
    selectedItems.length = 0
    total = 0
    
    // Sort bills by value
    const sortedItems = [...currencyItems].sort((a, b) => a.value - b.value)
    
    // For hard mode, try to use larger bills
    if (level === 'Hard') {
      const largeBills = sortedItems.filter(item => item.value >= 200)
      if (largeBills.length > 0) {
        for (let i = 0; i < numItems; i++) {
          const randomItem = largeBills[Math.floor(Math.random() * largeBills.length)]
          selectedItems.push(randomItem)
          total += randomItem.value
        }
      }
    }
    
    // If we still don't have enough items or the total is too high, add smaller bills
    while (selectedItems.length < numItems && total < range.max) {
      const randomItem = sortedItems[Math.floor(Math.random() * sortedItems.length)]
      selectedItems.push(randomItem)
      total += randomItem.value
    }
  }

  return {
    items: selectedItems,
    total: total
  }
}

export function generateGiveChangeRound(currency: CurrencyType, level: GameLevel = 'Easy'): GiveChangeRound {
  const range = LEVEL_RANGES[level]
  // Generate a price that's a multiple of common bill values
  const commonBills = CURRENCY_DATA[currency]
    .filter(item => item.type === 'bill')
    .map(item => item.value)
    .sort((a, b) => a - b)
  
  const randomBill = commonBills[Math.floor(Math.random() * commonBills.length)]
  const price = Number((Math.random() * (range.max - range.min) + range.min).toFixed(2))
  
  // Generate a given amount that's larger than the price and uses common bill values
  const maxGivenAmount = Math.min(range.max, price * 2) // Ensure given amount doesn't exceed level's max
  const givenAmount = Number((price + (Math.random() * (maxGivenAmount - price))).toFixed(2))
  
  // Calculate correct change
  const correctChange = Number((givenAmount - price).toFixed(2))

  return {
    price,
    givenAmount,
    correctChange
  }
}

// Conversion rates (these would typically come from an API in a real-world scenario)
const CONVERSION_RATES: Record<string, Record<CurrencyType, number>> = {
  MDL: { MDL: 1, USD: 0.056, EUR: 0.052 },
  USD: { MDL: 17.86, USD: 1, EUR: 0.93 },
  EUR: { MDL: 19.23, USD: 1.08, EUR: 1 }
}

export function generateCurrencyConvertRound(
  sourceCurrency: CurrencyType, 
  targetCurrency: CurrencyType,
  level: GameLevel = 'Easy'
): CurrencyConvertRound {
  const range = LEVEL_RANGES[level]
  // Generate a random amount in the source currency within the level's range
  const sourceAmount = Number((Math.random() * (range.max - range.min) + range.min).toFixed(2))
  
  // Convert to target currency
  const conversionRate = CONVERSION_RATES[sourceCurrency][targetCurrency]
  const convertedAmount = Number((sourceAmount * conversionRate).toFixed(2))

  return {
    sourceAmount,
    sourceCurrency,
    targetCurrency,
    convertedAmount,
    conversionRate
  }
}
