import { CurrencyType } from '../types/Currency'

export interface HighScore {
  accuracy: number
  correctRounds: number
  totalRounds: number
}

const HIGH_SCORES_KEY = 'moneyGameHighScores'

export const getHighScore = (currency: string): HighScore | null => {
  const scores = localStorage.getItem(HIGH_SCORES_KEY)
  if (!scores) return null
  
  const parsedScores = JSON.parse(scores)
  return parsedScores[currency] || null
}

export const saveHighScore = (currency: string, score: HighScore) => {
  const scores = localStorage.getItem(HIGH_SCORES_KEY)
  const parsedScores = scores ? JSON.parse(scores) : {}
  
  const currentHighScore = parsedScores[currency]
  if (!currentHighScore || score.accuracy > currentHighScore.accuracy) {
    parsedScores[currency] = score
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(parsedScores))
  }
}
