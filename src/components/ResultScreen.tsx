import React from 'react'
import { RefreshCw, Trophy } from 'lucide-react'
import { CurrencyType } from '../types/Currency'
import { GameResults } from '../types/GameTypes'
import { saveHighScore, getHighScore } from '../utils/highScoreUtils'

interface ResultScreenProps {
  results: GameResults
  currency: CurrencyType
  onRestart: () => void
}

const ResultScreen: React.FC<ResultScreenProps> = ({ results, currency, onRestart }) => {
  // Save high score when component mounts
  React.useEffect(() => {
    saveHighScore(currency, results.accuracy, results.correctRounds)
  }, [currency, results])

  const highScore = getHighScore(currency)
  const isNewHighScore = !highScore || results.accuracy > highScore.accuracy

  return (
    <div className="bg-dark-400 shadow-modern rounded-large p-8 space-y-6 text-center border border-dark-600">
      <h1 className="text-3xl font-bold text-brand-50 mb-4">Game Over</h1>

      {isNewHighScore && (
        <div className="bg-dark-500 rounded-lg p-4 flex items-center justify-center text-brand-50">
          <Trophy className="mr-2 w-8 h-8" />
          <span className="text-xl font-bold">New High Score!</span>
        </div>
      )}

      <div className="bg-dark-500 rounded-lg p-6 space-y-4 border border-dark-600">
        <div>
          <p className="text-xl font-semibold text-dark-800">Total Rounds</p>
          <p className="text-2xl font-bold text-brand-50">{results.totalRounds}</p>
        </div>

        <div>
          <p className="text-xl font-semibold text-dark-800">Correct Answers</p>
          <p className="text-2xl font-bold text-green-500">{results.correctRounds}</p>
        </div>

        <div>
          <p className="text-xl font-semibold text-dark-800">Accuracy</p>
          <p className="text-2xl font-bold text-brand-50">
            {(results.accuracy * 100).toFixed(0)}%
          </p>
        </div>

        {highScore && (
          <div>
            <p className="text-xl font-semibold text-dark-800">Previous Best</p>
            <p className="text-2xl font-bold text-purple-500">
              {(highScore.accuracy * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </div>

      <button 
        onClick={onRestart}
        className="w-full py-3 bg-brand-50 text-white rounded-lg hover:bg-brand-100 flex items-center justify-center"
      >
        <RefreshCw className="mr-2" /> Restart Game
      </button>
    </div>
  )
}

export default ResultScreen
