// src/components/PlayerStats.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PlayerStatsProps {
  stats: {
    totalGames: number;
    wins: number;
    highScore: number;
    recentGames: Array<{
      date: string;
      score: number;
      won: boolean;
    }>;
  };
}

const PlayerStats = ({ stats }: PlayerStatsProps) => {
  const winRate = stats.totalGames > 0 
    ? ((stats.wins / stats.totalGames) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Games Played</p>
          <p className="text-2xl font-bold text-white">{stats.totalGames}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Wins</p>
          <p className="text-2xl font-bold text-green-500">{stats.wins}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <p className="text-2xl font-bold text-blue-500">{winRate}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">High Score</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.highScore}</p>
        </div>
      </div>

      {/* Performance Chart */}
      {stats.recentGames.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl">
          <h3 className="text-white font-bold mb-4">Recent Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.recentGames}>
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Games */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-bold mb-4">Recent Games</h3>
        <div className="space-y-2">
          {stats.recentGames.slice(0, 5).map((game, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-2 rounded bg-gray-700"
            >
              <span className="text-gray-300">{game.date}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-300">Score: {game.score}</span>
                <span 
                  className={`px-2 py-1 rounded text-sm ${
                    game.won ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {game.won ? 'Won' : 'Lost'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;