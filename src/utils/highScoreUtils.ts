import { CurrencyType } from '../types/Currency'

interface HighScore {
  accuracy: number
  correctRounds: number
  date: string
}

export function saveHighScore(currency: CurrencyType, accuracy: number, correctRounds: number) {
  const highScores = JSON.parse(localStorage.getItem('moneyGameHighScores') || '{}')
  
  const newScore: HighScore = {
    accuracy,
    correctRounds,
    date: new Date().toISOString()
  }

  // Compare and update high score if new score is better
  const currentHighScore = highScores[currency]
  if (!currentHighScore || accuracy > currentHighScore.accuracy) {
    highScores[currency] = newScore
    localStorage.setItem('moneyGameHighScores', JSON.stringify(highScores))
  }
}

export function getHighScore(currency: CurrencyType): HighScore | null {
  const highScores = JSON.parse(localStorage.getItem('moneyGameHighScores') || '{}')
  return highScores[currency] || null
}
