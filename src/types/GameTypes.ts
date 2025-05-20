import { MoneyItem, CurrencyType } from './Currency'

export interface TotalCountRound {
  items: MoneyItem[]
  total: number
}

export interface GiveChangeRound {
  price: number
  givenAmount: number
  correctChange: number
}

export interface CurrencyConvertRound {
  sourceAmount: number
  sourceCurrency: CurrencyType
  targetCurrency: CurrencyType
  convertedAmount: number
  conversionRate: number
}

export interface GameRound {
  type: 'Total Count' | 'Give Change' | 'Currency Convert'
  data: TotalCountRound | GiveChangeRound | CurrencyConvertRound
}

export interface GameResults {
  totalRounds: number
  correctRounds: number
  accuracy: number
}

export type GameMode = 'Total Count' | 'Give Change' | 'Currency Convert' | 'Mixed Mode'

export interface GameSettings {
  timerDuration: number
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  timerDuration: 10
}
