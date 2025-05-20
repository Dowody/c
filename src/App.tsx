import React, { useState } from 'react'
import { CurrencyType } from './types/Currency'
import { GameResults, GameSettings, DEFAULT_GAME_SETTINGS } from './types/GameTypes'
import HomeScreen from './components/HomeScreen'
import GameScreen from './components/GameScreen'
import ResultScreen from './components/ResultScreen'

function App() {
  const [gameMode, setGameMode] = useState<'Total Count' | 'Give Change' | 'Currency Convert' | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType | null>(null)
  const [targetCurrency, setTargetCurrency] = useState<CurrencyType | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameResults, setGameResults] = useState<GameResults | null>(null)
  const [gameSettings, setGameSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS)

  const handleStartGame = (
    mode: 'Total Count' | 'Give Change' | 'Currency Convert', 
    currency: CurrencyType, 
    settings?: Partial<GameSettings>,
    targetCurrency?: CurrencyType
  ) => {
    setGameMode(mode)
    setSelectedCurrency(currency)
    setTargetCurrency(targetCurrency || null)
    setGameStarted(true)
    setGameResults(null)
    
    // Merge default settings with any provided settings
    if (settings) {
      setGameSettings(prev => ({...prev, ...settings}))
    }
  }

  const handleResetGame = () => {
    setGameStarted(false)
    setGameMode(null)
    setSelectedCurrency(null)
    setTargetCurrency(null)
    setGameResults(null)
    setGameSettings(DEFAULT_GAME_SETTINGS)
  }

  const handleGameResults = (results: GameResults) => {
    setGameStarted(false)
    setGameResults(results)
  }

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {gameResults ? (
          <ResultScreen 
            results={gameResults} 
            currency={selectedCurrency!} 
            onRestart={handleResetGame} 
          />
        ) : !gameStarted ? (
          <HomeScreen 
            onStartGame={handleStartGame} 
            defaultSettings={gameSettings}
          />
        ) : (
          <GameScreen 
            mode={gameMode!} 
            currency={selectedCurrency!} 
            targetCurrency={targetCurrency}
            onResetGame={handleResetGame}
            onGameComplete={handleGameResults}
            timerDuration={gameSettings.timerDuration}
          />
        )}
      </div>
    </div>
  )
}

export default App
