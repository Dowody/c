import { GameStats, GameResults, GameMode, GameLevel } from '../types/GameTypes'
import { CurrencyType } from '../types/Currency'

const STATS_KEY = 'money_counter_stats'

const DEFAULT_STATS: GameStats = {
  totalGames: 0,
  totalRounds: 0,
  correctRounds: 0,
  bestAccuracy: 0,
  averageTime: 0,
  modeStats: {
    'Total Count': createEmptyModeStats(),
    'Give Change': createEmptyModeStats(),
    'Currency Convert': createEmptyModeStats(),
    'Mixed Mode': createEmptyModeStats()
  },
  levelStats: {
    'Easy': createEmptyModeStats(),
    'Medium': createEmptyModeStats(),
    'Hard': createEmptyModeStats()
  },
  currencyStats: {
    'MDL': createEmptyModeStats(),
    'USD': createEmptyModeStats(),
    'EUR': createEmptyModeStats()
  }
}

function createEmptyModeStats() {
  return {
    gamesPlayed: 0,
    totalRounds: 0,
    correctRounds: 0,
    bestAccuracy: 0,
    averageTime: 0
  }
}

export function getStats(): GameStats {
  const savedStats = localStorage.getItem(STATS_KEY)
  return savedStats ? JSON.parse(savedStats) : DEFAULT_STATS
}

export function saveStats(stats: GameStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export function updateStats(results: GameResults) {
  const stats = getStats()
  
  // Update overall stats
  stats.totalGames++
  stats.totalRounds += results.totalRounds
  stats.correctRounds += results.correctRounds
  stats.bestAccuracy = Math.max(stats.bestAccuracy, results.accuracy)
  
  // Calculate new average time
  const totalTime = stats.averageTime * (stats.totalGames - 1) + results.averageTime
  stats.averageTime = totalTime / stats.totalGames

  // Update mode stats
  const modeStats = stats.modeStats[results.mode]
  modeStats.gamesPlayed++
  modeStats.totalRounds += results.totalRounds
  modeStats.correctRounds += results.correctRounds
  modeStats.bestAccuracy = Math.max(modeStats.bestAccuracy, results.accuracy)
  modeStats.averageTime = (modeStats.averageTime * (modeStats.gamesPlayed - 1) + results.averageTime) / modeStats.gamesPlayed

  // Update level stats
  const levelStats = stats.levelStats[results.level]
  levelStats.gamesPlayed++
  levelStats.totalRounds += results.totalRounds
  levelStats.correctRounds += results.correctRounds
  levelStats.bestAccuracy = Math.max(levelStats.bestAccuracy, results.accuracy)
  levelStats.averageTime = (levelStats.averageTime * (levelStats.gamesPlayed - 1) + results.averageTime) / levelStats.gamesPlayed

  // Update currency stats
  const currencyStats = stats.currencyStats[results.currency]
  currencyStats.gamesPlayed++
  currencyStats.totalRounds += results.totalRounds
  currencyStats.correctRounds += results.correctRounds
  currencyStats.bestAccuracy = Math.max(currencyStats.bestAccuracy, results.accuracy)
  currencyStats.averageTime = (currencyStats.averageTime * (currencyStats.gamesPlayed - 1) + results.averageTime) / currencyStats.gamesPlayed

  saveStats(stats)
  return stats
}

export function resetStats() {
  saveStats(DEFAULT_STATS)
  return DEFAULT_STATS
} 