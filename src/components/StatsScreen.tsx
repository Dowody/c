import React from 'react'
import { ArrowLeft, Trophy } from 'lucide-react'
import { CurrencyType } from '../types/Currency'
import { getHighScore } from '../utils/highScoreUtils'

interface StatsScreenProps {
  onBack: () => void
}

const StatsScreen: React.FC<StatsScreenProps> = ({ onBack }) => {
  const currencies: CurrencyType[] = ['MDL', 'USD', 'EUR']

  return (
    <div className="bg-dark-400 shadow-modern rounded-large p-6 space-y-4 border border-dark-600">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-dark-900">Statistics</h1>
        <button 
          onClick={onBack}
          className="text-dark-900 hover:text-brand-50 flex items-center text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
      </div>

      <div className="space-y-4">
        {currencies.map(currency => {
          const highScore = getHighScore(currency)
          return (
            <div key={currency} className="bg-dark-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-medium text-dark-900">{currency}</h2>
                <Trophy className="w-4 h-4 text-brand-50" />
              </div>
              {highScore ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-800">Best Accuracy:</span>
                    <span className="text-dark-900 font-medium">
                      {(highScore.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-800">Correct Answers:</span>
                    <span className="text-dark-900 font-medium">
                      {highScore.correctRounds}/{highScore.totalRounds}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-dark-800">No games played yet</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsScreen 