import React, { useState } from 'react'
import { CurrencyType } from '../types/Currency'
import { GameSettings, GameMode, GameLevel } from '../types/GameTypes'
import { Coins, DollarSign, Euro, Banknote, Trophy, Clock, ArrowLeftRight, Shuffle, BarChart2 } from 'lucide-react'
import { getHighScore } from '../utils/highScoreUtils'

interface HomeScreenProps {
  onStartGame: (
    mode: GameMode, 
    currency: CurrencyType, 
    settings?: Partial<GameSettings>,
    targetCurrency?: CurrencyType
  ) => void
  defaultSettings: GameSettings
  onShowStats: () => void
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame, defaultSettings, onShowStats }) => {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(defaultSettings.mode || null)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType | null>(defaultSettings.currency || null)
  const [targetCurrency, setTargetCurrency] = useState<CurrencyType | null>(defaultSettings.targetCurrency || null)
  const [timerDuration, setTimerDuration] = useState(defaultSettings.timerDuration)
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>(defaultSettings.level)

  const gameModes: { name: GameMode, icon: React.ElementType }[] = [
    { name: 'Total Count', icon: Coins },
    { name: 'Give Change', icon: Banknote },
    { name: 'Currency Convert', icon: ArrowLeftRight },
    { name: 'Mixed Mode', icon: Shuffle }
  ]

  const currencies: { name: CurrencyType, icon: React.ElementType }[] = [
    { name: 'MDL', icon: Coins },
    { name: 'USD', icon: DollarSign },
    { name: 'EUR', icon: Euro }
  ]

  const timerOptions = [5, 10, 15, 30]
  const levels: { name: GameLevel }[] = [
    { name: 'Easy' },
    { name: 'Medium' },
    { name: 'Hard' }
  ]

  const isStartEnabled = selectedMode && selectedCurrency && 
    (selectedMode !== 'Currency Convert' || targetCurrency)

  const renderHighScore = (currency: CurrencyType) => {
    const highScore = getHighScore(currency)
    if (!highScore) return null

    return (
      <div className="absolute top-1 right-1 bg-dark-500/90 rounded-full px-1.5 py-0.5 flex items-center">
        <Trophy className="w-2.5 h-2.5 text-brand-50" />
        <span className="text-[10px] ml-0.5 text-dark-900">
          {(highScore.accuracy * 100).toFixed(0)}%
        </span>
      </div>
    )
  }

  return (
    <div className="bg-dark-400 shadow-modern rounded-large p-6 space-y-4 border border-dark-600">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-dark-900">Money Counter</h1>
        <button
          onClick={onShowStats}
          className="p-2 rounded-lg bg-dark-500 text-dark-900 hover:bg-dark-600 transition-colors"
        >
          <BarChart2 className="w-5 h-5" />
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-dark-900">Select Game Mode</h2>
        <div className="grid grid-cols-2 gap-3">
          {gameModes.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => {
                setSelectedMode(name)
                setSelectedCurrency(null)
                setTargetCurrency(null)
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all relative 
                ${selectedMode === name 
                  ? 'bg-brand-100 text-white' 
                  : 'bg-dark-500 text-dark-900 hover:bg-dark-600'
                }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-dark-900">
          {selectedMode === 'Currency Convert' ? 'Select Source Currency' : 'Select Currency'}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {currencies.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => {
                if (selectedMode === 'Currency Convert' && selectedCurrency) {
                  setTargetCurrency(name)
                } else {
                  setSelectedCurrency(name)
                }
              }}
              className={`flex items-center justify-center p-3 rounded-lg transition-all relative 
                ${(selectedCurrency === name || targetCurrency === name)
                  ? 'bg-brand-100 text-white' 
                  : 'bg-dark-500 text-dark-900 hover:bg-dark-600'
                }`}
              disabled={
                selectedMode === 'Currency Convert' && 
                selectedCurrency === name
              }
            >
              <Icon className="w-4 h-4 mr-1" />
              <span className="text-xs">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-dark-900">Select Difficulty</h2>
        <div className="grid grid-cols-3 gap-3">
          {levels.map(({ name }) => (
            <button
              key={name}
              onClick={() => setSelectedLevel(name)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all
                ${selectedLevel === name
                  ? 'bg-brand-100 text-white' 
                  : 'bg-dark-500 text-dark-900 hover:bg-dark-600'
                }`}
            >
              <span className="text-xs font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-dark-900 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-brand-50" /> Timer Duration
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {timerOptions.map((duration) => (
            <button
              key={duration}
              onClick={() => setTimerDuration(duration)}
              className={`p-2 rounded-lg transition-all flex items-center justify-center text-xs
                ${timerDuration === duration
                  ? 'bg-brand-100 text-white' 
                  : 'bg-dark-500 text-dark-900 hover:bg-dark-600'
                }`}
            >
              {duration}s
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => isStartEnabled && onStartGame(
          selectedMode!, 
          selectedCurrency!, 
          { timerDuration, level: selectedLevel },
          selectedMode === 'Currency Convert' ? targetCurrency! : undefined
        )}
        disabled={!isStartEnabled}
        className={`w-full py-2 rounded-lg font-bold transition-all text-sm
          ${isStartEnabled 
            ? 'bg-brand-50 text-white hover:bg-brand-100' 
            : 'bg-dark-600 text-dark-800 cursor-not-allowed'
          }`}
      >
        Start Game
      </button>
    </div>
  )
}

export default HomeScreen
