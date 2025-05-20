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

export type GameMode = 'Total Count' | 'Give Change' | 'Currency Convert' | 'Mixed Mode'
export type GameLevel = 'Easy' | 'Medium' | 'Hard'

export interface GameSettings {
  timerDuration: number
  level: GameLevel
  mode?: GameMode
  currency?: CurrencyType
  targetCurrency?: CurrencyType
}

export interface GameStats {
  totalGames: number
  totalRounds: number
  correctRounds: number
  bestAccuracy: number
  averageTime: number
  modeStats: Record<GameMode, {
    gamesPlayed: number
    totalRounds: number
    correctRounds: number
    bestAccuracy: number
    averageTime: number
  }>
  levelStats: Record<GameLevel, {
    gamesPlayed: number
    totalRounds: number
    correctRounds: number
    bestAccuracy: number
    averageTime: number
  }>
  currencyStats: Record<CurrencyType, {
    gamesPlayed: number
    totalRounds: number
    correctRounds: number
    bestAccuracy: number
    averageTime: number
  }>
}

export interface GameResults {
  totalRounds: number
  correctRounds: number
  accuracy: number
  averageTime: number
  mode: GameMode
  level: GameLevel
  currency: CurrencyType
  targetCurrency?: CurrencyType
  roundDetails: {
    roundNumber: number
    correct: boolean
    timeSpent: number
    userAnswer: number
    correctAnswer: number
  }[]
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  timerDuration: 10,
  level: 'Easy'
}
