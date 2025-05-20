import { CURRENCY_DATA, CurrencyType, MoneyItem } from '../types/Currency'
import { TotalCountRound, GiveChangeRound, CurrencyConvertRound } from '../types/GameTypes'

export function generateTotalCountRound(currency: CurrencyType): TotalCountRound {
  const currencyItems = CURRENCY_DATA[currency].filter(item => item.type === 'bill')
  const numItems = Math.floor(Math.random() * 5) + 3 // 3-7 items
  
  const selectedItems: MoneyItem[] = []
  let total = 0

  for (let i = 0; i < numItems; i++) {
    const randomItem = currencyItems[Math.floor(Math.random() * currencyItems.length)]
    selectedItems.push(randomItem)
    total += randomItem.value
  }

  return {
    items: selectedItems,
    total: Math.round(total) // Round to whole number since we're only using bills
  }
}

export function generateGiveChangeRound(currency: CurrencyType): GiveChangeRound {
  const currencyItems = CURRENCY_DATA[currency]
  
  // Generate a random price between 1 and 50
  const price = Number((Math.random() * 50).toFixed(2))
  
  // Generate a given amount that's larger than the price
  const givenAmount = Number((price + (Math.random() * 10 + 1)).toFixed(2))
  
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

export function generateCurrencyConvertRound(sourceCurrency: CurrencyType, targetCurrency: CurrencyType): CurrencyConvertRound {
  // Generate a random amount in the source currency
  const sourceAmount = Number((Math.random() * 100 + 10).toFixed(2))
  
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
