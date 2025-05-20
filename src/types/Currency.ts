export type CurrencyType = 'MDL' | 'USD' | 'EUR'
export type MoneyItemType = 'coin' | 'bill'

export interface MoneyItem {
  value: number
  type: MoneyItemType
  currency: CurrencyType
  image?: string
}

export const CURRENCY_DATA: Record<CurrencyType, MoneyItem[]> = {
  MDL: [
    { value: 0.01, type: 'coin', currency: 'MDL', image: 'https://example.com/mdl-1-ban.jpg' },
    { value: 0.05, type: 'coin', currency: 'MDL', image: 'https://example.com/mdl-5-ban.jpg' },
    { value: 0.10, type: 'coin', currency: 'MDL', image: 'https://example.com/mdl-10-ban.jpg' },
    { value: 0.50, type: 'coin', currency: 'MDL', image: 'https://example.com/mdl-50-ban.jpg' },
    { value: 1, type: 'bill', currency: 'MDL', image: 'https://example.com/mdl-1-leu.jpg' },
    { value: 5, type: 'bill', currency: 'MDL', image: 'https://example.com/mdl-5-leu.jpg' },
    { value: 10, type: 'bill', currency: 'MDL', image: 'https://example.com/mdl-10-leu.jpg' },
    { value: 50, type: 'bill', currency: 'MDL', image: 'https://example.com/mdl-50-leu.jpg' },
    { value: 100, type: 'bill', currency: 'MDL', image: 'https://example.com/mdl-100-leu.jpg' },
  ],
  USD: [
    { value: 0.01, type: 'coin', currency: 'USD', image: 'https://example.com/usd-penny.jpg' },
    { value: 0.05, type: 'coin', currency: 'USD', image: 'https://example.com/usd-nickel.jpg' },
    { value: 0.10, type: 'coin', currency: 'USD', image: 'https://example.com/usd-dime.jpg' },
    { value: 0.25, type: 'coin', currency: 'USD', image: 'https://example.com/usd-quarter.jpg' },
    { value: 1, type: 'bill', currency: 'USD', image: 'https://example.com/usd-1-dollar.jpg' },
    { value: 5, type: 'bill', currency: 'USD', image: 'https://example.com/usd-5-dollar.jpg' },
    { value: 10, type: 'bill', currency: 'USD', image: 'https://example.com/usd-10-dollar.jpg' },
    { value: 20, type: 'bill', currency: 'USD', image: 'https://example.com/usd-20-dollar.jpg' },
    { value: 50, type: 'bill', currency: 'USD', image: 'https://example.com/usd-50-dollar.jpg' },
    { value: 100, type: 'bill', currency: 'USD', image: 'https://example.com/usd-100-dollar.jpg' },
  ],
  EUR: [
    { value: 0.01, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-1-cent.jpg' },
    { value: 0.02, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-2-cent.jpg' },
    { value: 0.05, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-5-cent.jpg' },
    { value: 0.10, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-10-cent.jpg' },
    { value: 0.20, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-20-cent.jpg' },
    { value: 0.50, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-50-cent.jpg' },
    { value: 1, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-1-euro.jpg' },
    { value: 2, type: 'coin', currency: 'EUR', image: 'https://example.com/eur-2-euro.jpg' },
    { value: 5, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-5-euro.jpg' },
    { value: 10, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-10-euro.jpg' },
    { value: 20, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-20-euro.jpg' },
    { value: 50, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-50-euro.jpg' },
    { value: 100, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-100-euro.jpg' },
    { value: 200, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-200-euro.jpg' },
    { value: 500, type: 'bill', currency: 'EUR', image: 'https://example.com/eur-500-euro.jpg' },
  ]
}
