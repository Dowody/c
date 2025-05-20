import { CURRENCY_DATA, CurrencyType, MoneyItem } from '../types/Currency'
import { TotalCountRound, GiveChangeRound, CurrencyConvertRound, GameLevel } from '../types/GameTypes'

const LEVEL_RANGES: Record<GameLevel, { min: number, max: number }> = {
  Easy: { min: 1, max: 500 },
  Medium: { min: 1, max: 5000 },
  Hard: { min: 1, max: 9999 }
}

export function generateTotalCountRound(currency: CurrencyType, level: GameLevel = 'Easy'): TotalCountRound {
  const range = LEVEL_RANGES[level]
  const allBills = CURRENCY_DATA[currency].filter(item => item.type === 'bill')
  
  // Filter bills based on level
  const currencyItems = allBills.filter(item => {
    if (level === 'Easy') return item.value <= 100
    if (level === 'Medium') return item.value > 100 && item.value <= 1000
    return item.value === 200 || item.value === 500 // Hard level - only use 200 and 500 bills
  })

  // If no bills match the level criteria, fall back to all bills
  const itemsToUse = currencyItems.length > 0 ? currencyItems : allBills
  
  // Adjust number of items based on level
  const numItems = level === 'Hard' 
    ? Math.floor(Math.random() * 3) + 4  // 4-6 items for hard mode
    : Math.floor(Math.random() * 3) + 2  // 2-4 items for easy/medium

  const selectedItems: MoneyItem[] = []
  let total = 0
  let attempts = 0
  const maxAttempts = 10

  while (attempts < maxAttempts) {
    selectedItems.length = 0
    total = 0

    for (let i = 0; i < numItems; i++) {
      const randomItem = itemsToUse[Math.floor(Math.random() * itemsToUse.length)]
      selectedItems.push(randomItem)
      total += randomItem.value
    }

    if (total >= range.min && total <= range.max) {
      break
    }
    attempts++
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
