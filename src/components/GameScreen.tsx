import React, { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Clock, ArrowLeftRight } from 'lucide-react'
import { CurrencyType } from '../types/Currency'
import { GameResults, GameMode, GameLevel } from '../types/GameTypes'
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
  targetCurrency?: CurrencyType
  onResetGame: () => void
  onGameComplete: (results: GameResults) => void
  timerDuration: number
  level: GameLevel
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  mode, 
  currency, 
  targetCurrency,
  onResetGame, 
  onGameComplete,
  timerDuration,
  level
}) => {
  const [round, setRound] = useState<TotalCountRound | GiveChangeRound | CurrencyConvertRound | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(timerDuration)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [roundNumber, setRoundNumber] = useState(1)
  const [correctRounds, setCorrectRounds] = useState(0)
  const [currentMode, setCurrentMode] = useState<Exclude<GameMode, 'Mixed Mode'>>('Total Count')
  const [roundStartTime, setRoundStartTime] = useState<number>(Date.now())
  const [roundDetails, setRoundDetails] = useState<{
    roundNumber: number
    correct: boolean
    timeSpent: number
    userAnswer: number
    correctAnswer: number
  }[]>([])

  // Regenerate round when timer duration changes
  useEffect(() => {
    generateNewRound()
    setTimeLeft(timerDuration)
  }, [timerDuration])

  // Generate round when component mounts or mode/currency changes
  useEffect(() => {
    if (mode !== 'Mixed Mode') {
      setCurrentMode(mode)
    }
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

  const generateNewRound = useCallback(() => {
    let newMode = mode

    if (mode === 'Mixed Mode') {
      // Randomly select a mode for this round
      const modes: Exclude<GameMode, 'Mixed Mode'>[] = ['Total Count', 'Give Change', 'Currency Convert']
      newMode = modes[Math.floor(Math.random() * modes.length)]
      setCurrentMode(newMode)
    }

    let newRound: TotalCountRound | GiveChangeRound | CurrencyConvertRound
    try {
      if (newMode === 'Total Count') {
        newRound = generateTotalCountRound(currency, level)
      } else if (newMode === 'Give Change') {
        newRound = generateGiveChangeRound(currency, level)
      } else {
        if (!targetCurrency) {
          throw new Error('Target currency is required for currency conversion')
        }
        newRound = generateCurrencyConvertRound(currency, targetCurrency, level)
      }
      
      // Validate the round data
      if (newMode === 'Total Count' && (!newRound || !(newRound as TotalCountRound).items)) {
        throw new Error('Invalid Total Count round data')
      } else if (newMode === 'Give Change' && (!newRound || !(newRound as GiveChangeRound).price || !(newRound as GiveChangeRound).givenAmount)) {
        throw new Error('Invalid Give Change round data')
      } else if (newMode === 'Currency Convert' && (!newRound || !(newRound as CurrencyConvertRound).sourceAmount || !(newRound as CurrencyConvertRound).targetCurrency)) {
        throw new Error('Invalid Currency Convert round data')
      }

      setRound(newRound)
      setUserAnswer('')
      setTimeLeft(timerDuration)
      setIsGameOver(false)
      setIsCorrect(null)
      setRoundStartTime(Date.now())
    } catch (error) {
      console.error('Error generating round:', error)
      // Retry generating the round
      setTimeout(generateNewRound, 0)
    }
  }, [mode, currency, targetCurrency, timerDuration, level])

  const handleSubmit = () => {
    if (!round) return

    const timeSpent = timerDuration - timeLeft
    let correct = false
    let correctAnswer = 0

    // Convert user answer from comma format to number
    const userAnswerNumber = Number(userAnswer.replace(',', '.'))

    switch (currentMode) {
      case 'Total Count':
        const totalCountRound = round as TotalCountRound
        correctAnswer = totalCountRound.total
        correct = userAnswerNumber === correctAnswer
        break
      case 'Give Change':
        const giveChangeRound = round as GiveChangeRound
        correctAnswer = giveChangeRound.correctChange
        correct = userAnswerNumber === correctAnswer
        break
      case 'Currency Convert':
        const currencyConvertRound = round as CurrencyConvertRound
        correctAnswer = currencyConvertRound.convertedAmount
        const errorMargin = correctAnswer * 0.01 // 1% error margin
        correct = Math.abs(userAnswerNumber - correctAnswer) <= errorMargin
        break
    }

    setIsCorrect(correct)
    setIsGameOver(true)
    
    if (correct) {
      setCorrectRounds(prev => prev + 1)
    }

    // Record round details
    setRoundDetails(prev => [...prev, {
      roundNumber,
      correct,
      timeSpent,
      userAnswer: userAnswerNumber,
      correctAnswer
    }])
  }

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
        const averageTime = roundDetails.reduce((sum, round) => sum + round.timeSpent, 0) / roundDetails.length
        onGameComplete({
          totalRounds: 10,
          correctRounds,
          accuracy: correctRounds / 10,
          averageTime,
          mode,
          level,
          currency,
          targetCurrency,
          roundDetails
        })
      }
    }
    return () => clearTimeout(timer)
  }, [isGameOver, roundNumber])

  const handleKeyPress = (value: string) => {
    if (isGameOver) return
    
    if (value === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1))
    } else if (value === ',') {
      // Only add comma if there isn't already one
      if (!userAnswer.includes(',')) {
        setUserAnswer(prev => prev + ',')
      }
    } else {
      setUserAnswer(prev => prev + value)
    }
  }

  const renderNumericKeypad = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [',', '0', 'backspace']
    ]

    return (
      <div className="grid grid-cols-3 gap-1.5 mt-2 w-full">
        {keys.flat().map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            disabled={isGameOver}
            className={`h-10 flex items-center justify-center rounded-lg text-base font-medium transition-colors
              ${isGameOver 
                ? 'bg-dark-600 text-dark-800 cursor-not-allowed' 
                : 'bg-dark-500 text-dark-900 hover:bg-dark-600'
              }`}
          >
            {key === 'backspace' ? '⌫' : key}
          </button>
        ))}
      </div>
    )
  }

  const renderRoundDetails = () => {
    if (!round) return null

    switch (currentMode) {
      case 'Total Count':
        const totalCountRound = round as TotalCountRound
        if (!totalCountRound?.items) return null
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
        if (!giveChangeRound?.price || !giveChangeRound?.givenAmount) return null
        return (
          <div className="mb-3 space-y-3">
            <div className="bg-dark-500 rounded-lg p-3 border border-dark-600">
              <p className="text-xs text-dark-800 mb-1">Price</p>
              <p className="text-lg font-semibold text-dark-900">
                {formatMoney(giveChangeRound.price, currency)}
              </p>
            </div>
            <div className="bg-dark-500 rounded-lg p-3 border border-dark-600">
              <p className="text-xs text-dark-800 mb-1">Given Amount</p>
              <p className="text-lg font-semibold text-dark-900">
                {formatMoney(giveChangeRound.givenAmount, currency)}
              </p>
            </div>
          </div>
        )
      case 'Currency Convert':
        const currencyConvertRound = round as CurrencyConvertRound
        if (!currencyConvertRound?.sourceAmount || !currencyConvertRound?.targetCurrency) return null
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

        <div className="bg-dark-500 rounded-lg p-3 mb-3">
          <div className="text-right text-2xl font-bold text-dark-900 min-h-[2rem] flex items-center justify-end">
            <span>{userAnswer || '0'}</span>
            <span className="ml-2 text-base text-dark-800">
              {currentMode === 'Currency Convert' 
                ? (round as CurrencyConvertRound).targetCurrency 
                : currency}
            </span>
          </div>
        </div>

        {renderNumericKeypad()}

        <button 
          onClick={handleSubmit}
          disabled={isGameOver}
          className={`w-full mt-3 py-2 rounded-lg transition-colors text-sm
            ${isGameOver 
              ? 'bg-dark-600 text-dark-800 cursor-not-allowed' 
              : 'bg-brand-50 text-white hover:bg-brand-100'
            }`}
        >
          Submit
        </button>

        {renderResult()}
      </div>
    </div>
  )
}

export default GameScreen