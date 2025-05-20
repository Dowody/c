import { CURRENCY_DATA, CurrencyType, MoneyItem } from '../types/Currency'
import { TotalCountRound, GiveChangeRound, CurrencyConvertRound, GameLevel } from '../types/GameTypes'

const LEVEL_RANGES: Record<GameLevel, { min: number, max: number }> = {
  Easy: { min: 100, max: 1000 },
  Medium: { min: 1000, max: 5000 },
  Hard: { min: 5000, max: 20000 }
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
  const maxAttempts = 20 // Increased max attempts to ensure we get a valid combination

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

    if (total >= range.min && total <= range.max) {
      break
    }
    attempts++
  }

  // If we couldn't find a valid combination, adjust the total to be within range
  if (total < range.min) {
    total = range.min
  } else if (total > range.max) {
    total = range.max
  }

  return {
    items: selectedItems,
    total: Math.round(total)
  }
}

export function generateGiveChangeRound(currency: CurrencyType, level: GameLevel = 'Easy'): GiveChangeRound {
  const range = LEVEL_RANGES[level]
  const price = Number((Math.random() * (range.max - range.min) + range.min).toFixed(2))
  
  // Generate a given amount that's larger than the price
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
