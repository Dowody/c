import React, { useEffect } from 'react'
import { ArrowLeft, Trophy, BanknoteArrowDown } from 'lucide-react'
import { CurrencyType } from '../types/Currency'
import { GameResults } from '../types/GameTypes'
import { saveHighScore } from '../utils/highScoreUtils'

interface ResultScreenProps {
  results: GameResults
  currency: CurrencyType
  onRestart: () => void
}

const ResultScreen: React.FC<ResultScreenProps> = ({ results, currency, onRestart }) => {
  useEffect(() => {
    saveHighScore(currency, {
      accuracy: results.accuracy,
      correctRounds: results.correctRounds,
      totalRounds: results.totalRounds
    })
  }, [results, currency])

  return (
    <div className="bg-dark-400 shadow-modern rounded-large p-6 space-y-4 border border-dark-600">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-dark-900">Game Results</h1>
        <button 
          onClick={onRestart}
          className="text-dark-900 hover:text-brand-50 flex items-center text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
      </div>

      <div className="bg-dark-500 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-medium text-dark-900">Score</h2>
          <Trophy className="w-4 h-4 text-brand-50" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-dark-800">Accuracy:</span>
            <span className="text-dark-900 font-medium">
              {(results.accuracy * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-800">Correct Answers:</span>
            <span className="text-dark-900 font-medium">
              {results.correctRounds}/{results.totalRounds}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
