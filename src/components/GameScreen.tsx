import React, { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Clock, ArrowLeftRight } from 'lucide-react'
import { CurrencyType } from '../types/Currency'
import { GameResults, GameMode } from '../types/GameTypes'
import { 
  generateTotalCountRound, 
  generateGiveChangeRound, 
  generateCurrencyConvertRound 
} from '../utils/gameUtils'
import { formatMoney } from '../utils/formatUtils'
import { 
  TotalCountRound, 
  GiveChangeRound, 
  CurrencyConvertRound 
} from '../types/GameTypes'

interface GameScreenProps {
  mode: GameMode
  currency: CurrencyType
  targetCurrency?: CurrencyType | null
  onResetGame: () => void
  onGameComplete: (results: GameResults) => void
  timerDuration: number
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  mode, 
  currency, 
  targetCurrency,
  onResetGame, 
  onGameComplete,
  timerDuration
}) => {
  const [round, setRound] = useState<TotalCountRound | GiveChangeRound | CurrencyConvertRound | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(timerDuration)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [roundNumber, setRoundNumber] = useState(1)
  const [correctRounds, setCorrectRounds] = useState(0)
  const [currentMode, setCurrentMode] = useState<Exclude<GameMode, 'Mixed Mode'>>('Total Count')

  // Regenerate round when timer duration changes
  useEffect(() => {
    generateNewRound()
    setTimeLeft(timerDuration)
  }, [timerDuration])

  // Generate round when component mounts or mode/currency changes
  useEffect(() => {
    generateNewRound()
  }, [mode, currency, targetCurrency])

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isGameOver])

  // Auto-move to next round after showing result
  useEffect(() => {
    let timer: number
    if (isGameOver) {
      if (roundNumber < 10) {
        timer = setTimeout(() => {
          generateNewRound()
          setRoundNumber(prev => prev + 1)
        }, 2000)
      } else {
        // Game completed
        onGameComplete({
          totalRounds: 10,
          correctRounds,
          accuracy: correctRounds / 10
        })
      }
    }
    return () => clearTimeout(timer)
  }, [isGameOver, roundNumber])

  const generateNewRound = useCallback(() => {
    let newMode = mode

    if (mode === 'Mixed Mode') {
      // Randomly select a mode for this round
      const modes: Exclude<GameMode, 'Mixed Mode'>[] = ['Total Count', 'Give Change', 'Currency Convert']
      newMode = modes[Math.floor(Math.random() * modes.length)]
      setCurrentMode(newMode)
    }

    let newRound: TotalCountRound | GiveChangeRound | CurrencyConvertRound
    if (newMode === 'Total Count') {
      newRound = generateTotalCountRound(currency)
    } else if (newMode === 'Give Change') {
      newRound = generateGiveChangeRound(currency)
    } else {
      newRound = generateCurrencyConvertRound(currency, targetCurrency!)
    }
    
    setRound(newRound)
    setUserAnswer('')
    setTimeLeft(timerDuration)
    setIsGameOver(false)
    setIsCorrect(null)
  }, [mode, currency, targetCurrency, timerDuration])

  const handleSubmit = () => {
    if (!round) return

    let correct = false
    switch (currentMode) {
      case 'Total Count':
        const totalCountRound = round as TotalCountRound
        correct = Number(userAnswer) === totalCountRound.total
        break
      case 'Give Change':
        const giveChangeRound = round as GiveChangeRound
        correct = Number(userAnswer) === giveChangeRound.correctChange
        break
      case 'Currency Convert':
        const currencyConvertRound = round as CurrencyConvertRound
        const userAmount = Number(userAnswer)
        const correctAmount = currencyConvertRound.convertedAmount
        const errorMargin = correctAmount * 0.01 // 1% error margin
        correct = Math.abs(userAmount - correctAmount) <= errorMargin
        break
    }

    setIsCorrect(correct)
    setIsGameOver(true)
    
    if (correct) {
      setCorrectRounds(prev => prev + 1)
    }
  }

  const renderRoundDetails = () => {
    if (!round) return null

    switch (currentMode) {
      case 'Total Count':
        const totalCountRound = round as TotalCountRound
        return (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {totalCountRound.items.map((item, index) => (
              <div 
                key={index} 
                className="bg-dark-500 rounded-lg p-2 text-center border border-dark-600 text-sm"
              >
                <span>{formatMoney(item.value, currency)}</span>
              </div>
            ))}
          </div>
        )
      case 'Give Change':
        const giveChangeRound = round as GiveChangeRound
        return (
          <div className="mb-3 text-center">
            <p className="text-base">
              Price: {formatMoney(giveChangeRound.price, currency)}
            </p>
            <p className="text-base">
              Given: {formatMoney(giveChangeRound.givenAmount, currency)}
            </p>
          </div>
        )
      case 'Currency Convert':
        const currencyConvertRound = round as CurrencyConvertRound
        return (
          <div className="mb-3 text-center">
            <p className="text-base flex items-center justify-center">
              {formatMoney(currencyConvertRound.sourceAmount, currencyConvertRound.sourceCurrency)}
              <ArrowLeftRight className="w-4 h-4 mx-2 text-brand-50" />
              {currencyConvertRound.targetCurrency}
            </p>
            <p className="text-xs text-dark-800">
              1 {currencyConvertRound.sourceCurrency} = {currencyConvertRound.conversionRate.toFixed(4)} {currencyConvertRound.targetCurrency}
            </p>
          </div>
        )
    }
  }

  const renderResult = () => {
    if (!isGameOver || !round) return null

    let correctAnswer: number
    switch (currentMode) {
      case 'Total Count':
        correctAnswer = (round as TotalCountRound).total
        break
      case 'Give Change':
        correctAnswer = (round as GiveChangeRound).correctChange
        break
      case 'Currency Convert':
        correctAnswer = (round as CurrencyConvertRound).convertedAmount
        break
    }

    return (
      <div className={`mt-3 p-3 rounded-lg ${
        isCorrect 
          ? 'bg-green-900 border border-green-700' 
          : 'bg-red-900 border border-red-700'
      }`}>
        <p className="text-center font-bold text-base">
          {isCorrect ? 'Correct!' : 'Wrong Answer'}
        </p>
        <p className="text-center text-sm">
          Correct Answer: {formatMoney(correctAnswer, 
            currentMode === 'Currency Convert' 
              ? (round as CurrencyConvertRound).targetCurrency 
              : currency
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-dark-400 shadow-modern rounded-large p-6 space-y-4 border border-dark-600">
      <div className="flex items-center justify-between">
        <button 
          onClick={onResetGame} 
          className="text-dark-900 hover:text-brand-50 flex items-center text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-dark-800">Round: {roundNumber}/10</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-brand-50" />
            <span className="text-base font-bold text-brand-50">{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-dark-900 mb-3">
          {mode === 'Mixed Mode' 
            ? `${currentMode} (Mixed Mode)` 
            : mode === 'Currency Convert' 
              ? `${currency} to ${targetCurrency}` 
              : mode
          }
        </h2>
        
        {renderRoundDetails()}

        <div className="flex">
          <input 
            type="number" 
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={
              currentMode === 'Total Count' 
                ? 'Total amount' 
                : currentMode === 'Give Change' 
                  ? 'Change amount' 
                  : 'Converted amount'
            }
            className="flex-grow px-3 py-2 bg-dark-500 border border-dark-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brand-50 text-dark-900 text-sm"
            disabled={isGameOver}
          />
          <button 
            onClick={handleSubmit}
            disabled={isGameOver}
            className={`px-3 py-2 rounded-r-lg transition-colors text-sm
              ${isGameOver 
                ? 'bg-dark-600 text-dark-800 cursor-not-allowed' 
                : 'bg-brand-50 text-white hover:bg-brand-100'
              }`}
          >
            Submit
          </button>
        </div>

        {renderResult()}
      </div>
    </div>
  )
}

export default GameScreen
