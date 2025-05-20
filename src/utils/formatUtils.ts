import { CurrencyType } from '../types/Currency'

export function formatMoney(value: number, currency: CurrencyType): string {
  const currencyOptions: Record<CurrencyType, string> = {
    MDL: 'ro-RO', // Romanian Leu (Moldova)
    USD: 'en-US', // US Dollars
    EUR: 'de-DE'  // Euro (using German locale for formatting)
  }

  const currencySymbols: Record<CurrencyType, string> = {
    MDL: 'MDL',
    USD: '$',
    EUR: '€'
  }

  return new Intl.NumberFormat(currencyOptions[currency], {
    style: 'currency',
    currency: currency
  }).format(value)
}
