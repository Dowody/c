import React, { useState } from 'react'
import { CurrencyType } from './types/Currency'
import { GameMode, GameSettings, GameLevel } from './types/GameTypes'
import HomeScreen from './components/HomeScreen'
import GameScreen from './components/GameScreen'
import StatsScreen from './components/StatsScreen'
import { updateStats } from './utils/statsUtils'

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'game' | 'stats'>('home')
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType | null>(null)
  const [targetCurrency, setTargetCurrency] = useState<CurrencyType | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    timerDuration: 10,
    level: 'Easy'
  })

  const handleStartGame = (
    mode: GameMode, 
    currency: CurrencyType, 
    settings?: Partial<GameSettings>,
    targetCurrency?: CurrencyType
  ) => {
    setSelectedMode(mode)
    setSelectedCurrency(currency)
    setTargetCurrency(targetCurrency || null)
    const newSettings = {
      ...gameSettings,
      ...settings,
      mode,
      currency,
      targetCurrency
    }
    setGameSettings(newSettings)
    setCurrentScreen('game')
  }

  const handleGameComplete = (results: any) => {
    setGameStarted(false)
    // Update statistics
    updateStats(results)
    setCurrentScreen('home')
  }

  const handleShowStats = () => {
    setCurrentScreen('stats')
  }

  const handleResetGame = () => {
    setCurrentScreen('home')
    setGameStarted(false)
    setSelectedMode(null)
    setSelectedCurrency(null)
    setTargetCurrency(null)
    setGameSettings({
      timerDuration: 10,
      level: 'Easy'
    })
  }

  if (currentScreen === 'stats') {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <StatsScreen onBack={handleResetGame} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartGame={handleStartGame}
            defaultSettings={gameSettings}
            onShowStats={handleShowStats}
          />
        )}
        {currentScreen === 'game' && selectedMode && selectedCurrency && (
          <GameScreen
            mode={selectedMode}
            currency={selectedCurrency}
            targetCurrency={targetCurrency || undefined}
            onResetGame={handleResetGame}
            onGameComplete={handleGameComplete}
            timerDuration={gameSettings.timerDuration}
            level={gameSettings.level}
          />
        )}
      </div>
    </div>
  )
}

export default App
