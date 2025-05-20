import { CurrencyType, MoneyItem } from '../types/Currency'

export const CURRENCY_DATA: Record<CurrencyType, MoneyItem[]> = {
  MDL: [
    { type: 'coin', value: 0.01, currency: 'MDL', image: '/images/mdl/0.01.png' },
    { type: 'coin', value: 0.05, currency: 'MDL', image: '/images/mdl/0.05.png' },
    { type: 'coin', value: 0.10, currency: 'MDL', image: '/images/mdl/0.10.png' },
    { type: 'coin', value: 0.25, currency: 'MDL', image: '/images/mdl/0.25.png' },
    { type: 'coin', value: 0.50, currency: 'MDL', image: '/images/mdl/0.50.png' },
    { type: 'coin', value: 1, currency: 'MDL', image: '/images/mdl/1.png' },
    { type: 'coin', value: 2, currency: 'MDL', image: '/images/mdl/2.png' },
    { type: 'coin', value: 5, currency: 'MDL', image: '/images/mdl/5.png' },
    { type: 'bill', value: 10, currency: 'MDL', image: '/images/mdl/10.png' },
    { type: 'bill', value: 20, currency: 'MDL', image: '/images/mdl/20.png' },
    { type: 'bill', value: 50, currency: 'MDL', image: '/images/mdl/50.png' },
    { type: 'bill', value: 100, currency: 'MDL', image: '/images/mdl/100.png' },
    { type: 'bill', value: 200, currency: 'MDL', image: '/images/mdl/200.png' },
    { type: 'bill', value: 500, currency: 'MDL', image: '/images/mdl/500.png' },
    { type: 'bill', value: 1000, currency: 'MDL', image: '/images/mdl/1000.png' }
  ],
  USD: [
    { type: 'coin', value: 0.01, currency: 'USD', image: '/images/usd/0.01.png' },
    { type: 'coin', value: 0.05, currency: 'USD', image: '/images/usd/0.05.png' },
    { type: 'coin', value: 0.10, currency: 'USD', image: '/images/usd/0.10.png' },
    { type: 'coin', value: 0.25, currency: 'USD', image: '/images/usd/0.25.png' },
    { type: 'coin', value: 0.50, currency: 'USD', image: '/images/usd/0.50.png' },
    { type: 'coin', value: 1, currency: 'USD', image: '/images/usd/1.png' },
    { type: 'bill', value: 1, currency: 'USD', image: '/images/usd/1.png' },
    { type: 'bill', value: 2, currency: 'USD', image: '/images/usd/2.png' },
    { type: 'bill', value: 5, currency: 'USD', image: '/images/usd/5.png' },
    { type: 'bill', value: 10, currency: 'USD', image: '/images/usd/10.png' },
    { type: 'bill', value: 20, currency: 'USD', image: '/images/usd/20.png' },
    { type: 'bill', value: 50, currency: 'USD', image: '/images/usd/50.png' },
    { type: 'bill', value: 100, currency: 'USD', image: '/images/usd/100.png' }
  ],
  EUR: [
    { type: 'coin', value: 0.01, currency: 'EUR', image: '/images/eur/0.01.png' },
    { type: 'coin', value: 0.02, currency: 'EUR', image: '/images/eur/0.02.png' },
    { type: 'coin', value: 0.05, currency: 'EUR', image: '/images/eur/0.05.png' },
    { type: 'coin', value: 0.10, currency: 'EUR', image: '/images/eur/0.10.png' },
    { type: 'coin', value: 0.20, currency: 'EUR', image: '/images/eur/0.20.png' },
    { type: 'coin', value: 0.50, currency: 'EUR', image: '/images/eur/0.50.png' },
    { type: 'coin', value: 1, currency: 'EUR', image: '/images/eur/1.png' },
    { type: 'coin', value: 2, currency: 'EUR', image: '/images/eur/2.png' },
    { type: 'bill', value: 5, currency: 'EUR', image: '/images/eur/5.png' },
    { type: 'bill', value: 10, currency: 'EUR', image: '/images/eur/10.png' },
    { type: 'bill', value: 20, currency: 'EUR', image: '/images/eur/20.png' },
    { type: 'bill', value: 50, currency: 'EUR', image: '/images/eur/50.png' },
    { type: 'bill', value: 100, currency: 'EUR', image: '/images/eur/100.png' },
    { type: 'bill', value: 200, currency: 'EUR', image: '/images/eur/200.png' },
    { type: 'bill', value: 500, currency: 'EUR', image: '/images/eur/500.png' }
  ]
} 