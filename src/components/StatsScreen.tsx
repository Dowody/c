import React from 'react'
import { ArrowLeft, Trophy, Clock, BarChart2 } from 'lucide-react'
import { GameStats } from '../types/GameTypes'
import { getStats } from '../utils/statsUtils'

interface StatsScreenProps {
  onBack: () => void
}

const StatsScreen: React.FC<StatsScreenProps> = ({ onBack }) => {
  const stats = getStats()

  const renderStatCard = (title: string, value: string | number, icon: React.ReactNode) => (
    <div className="bg-dark-500 rounded-lg p-4 flex items-center">
      <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <p className="text-xs text-dark-800">{title}</p>
        <p className="text-base font-semibold text-dark-900">{value}</p>
      </div>
    </div>
  )

  const renderModeStats = () => (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-dark-900">Game Modes</h3>
      {Object.entries(stats.modeStats).map(([mode, modeStats]) => (
        <div key={mode} className="bg-dark-500 rounded-lg p-3">
          <h4 className="text-sm font-medium text-dark-900 mb-2">{mode}</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-dark-800">Games Played</p>
              <p className="text-sm font-semibold text-dark-900">{modeStats.gamesPlayed}</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Best Accuracy</p>
              <p className="text-sm font-semibold text-dark-900">{(modeStats.bestAccuracy * 100).toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Avg. Time</p>
              <p className="text-sm font-semibold text-dark-900">{modeStats.averageTime.toFixed(1)}s</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Total Rounds</p>
              <p className="text-sm font-semibold text-dark-900">{modeStats.totalRounds}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderLevelStats = () => (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-dark-900">Difficulty Levels</h3>
      {Object.entries(stats.levelStats).map(([level, levelStats]) => (
        <div key={level} className="bg-dark-500 rounded-lg p-3">
          <h4 className="text-sm font-medium text-dark-900 mb-2">{level}</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-dark-800">Games Played</p>
              <p className="text-sm font-semibold text-dark-900">{levelStats.gamesPlayed}</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Best Accuracy</p>
              <p className="text-sm font-semibold text-dark-900">{(levelStats.bestAccuracy * 100).toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Avg. Time</p>
              <p className="text-sm font-semibold text-dark-900">{levelStats.averageTime.toFixed(1)}s</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Total Rounds</p>
              <p className="text-sm font-semibold text-dark-900">{levelStats.totalRounds}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderCurrencyStats = () => (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-dark-900">Currencies</h3>
      {Object.entries(stats.currencyStats).map(([currency, currencyStats]) => (
        <div key={currency} className="bg-dark-500 rounded-lg p-3">
          <h4 className="text-sm font-medium text-dark-900 mb-2">{currency}</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-dark-800">Games Played</p>
              <p className="text-sm font-semibold text-dark-900">{currencyStats.gamesPlayed}</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Best Accuracy</p>
              <p className="text-sm font-semibold text-dark-900">{(currencyStats.bestAccuracy * 100).toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Avg. Time</p>
              <p className="text-sm font-semibold text-dark-900">{currencyStats.averageTime.toFixed(1)}s</p>
            </div>
            <div>
              <p className="text-xs text-dark-800">Total Rounds</p>
              <p className="text-sm font-semibold text-dark-900">{currencyStats.totalRounds}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-dark-400 shadow-modern rounded-large p-6 space-y-6 border border-dark-600">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-dark-900">Statistics</h1>
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-dark-500 text-dark-900 hover:bg-dark-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {renderStatCard('Total Games', stats.totalGames, <Trophy className="w-4 h-4 text-brand-50" />)}
        {renderStatCard('Best Accuracy', `${(stats.bestAccuracy * 100).toFixed(0)}%`, <BarChart2 className="w-4 h-4 text-brand-50" />)}
        {renderStatCard('Total Rounds', stats.totalRounds, <BarChart2 className="w-4 h-4 text-brand-50" />)}
        {renderStatCard('Avg. Time', `${stats.averageTime.toFixed(1)}s`, <Clock className="w-4 h-4 text-brand-50" />)}
      </div>

      <div className="space-y-6">
        {renderModeStats()}
        {renderLevelStats()}
        {renderCurrencyStats()}
      </div>
    </div>
  )
}

export default StatsScreen 