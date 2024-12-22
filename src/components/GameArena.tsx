// src/components/GameArena.tsx

import React, { useState, useEffect } from 'react';
import { Swords } from 'lucide-react';

interface GameArenaProps {
  onGameComplete: (won: boolean, score: number) => void;
  tokenAmount: number;
  isLoading?: boolean;
}

const GameArena = ({ onGameComplete, tokenAmount, isLoading = false }: GameArenaProps) => {
  const [gameState, setGameState] = useState({
    health: 100,
    score: 0,
    isPlaying: false,
    timeLeft: 60
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }

    if (gameState.timeLeft === 0) {
      handleGameOver();
    }

    return () => clearInterval(timer);
  }, [gameState.isPlaying, gameState.timeLeft]);

  const startGame = () => {
    setGameState({
      health: 100,
      score: 0,
      isPlaying: true,
      timeLeft: 60
    });
  };

  const handleDodge = () => {
    if (!gameState.isPlaying) return;
    setGameState(prev => ({
      ...prev,
      score: prev.score + 10
    }));
  };

  const handleHit = () => {
    if (!gameState.isPlaying) return;
    const newHealth = gameState.health - 20;
    setGameState(prev => ({
      ...prev,
      health: Math.max(0, newHealth)
    }));

    if (newHealth <= 0) {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    const won = gameState.health > 0 && gameState.score >= 100;
    setGameState(prev => ({ ...prev, isPlaying: false }));
    onGameComplete(won, gameState.score);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Health</p>
          <p className="text-2xl font-bold text-green-500">{gameState.health}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Score</p>
          <p className="text-2xl font-bold text-blue-500">{gameState.score}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Time</p>
          <p className="text-2xl font-bold text-yellow-500">{gameState.timeLeft}s</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-64 bg-gray-800 rounded-xl mb-8 flex items-center justify-center">
        <Swords 
          size={64} 
          className={`text-red-500 absolute ${gameState.isPlaying ? 'animate-bounce' : ''}`}
          onClick={handleHit}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!gameState.isPlaying ? (
          <button 
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            onClick={startGame}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : `Start Game (${tokenAmount} tokens)`}
          </button>
        ) : (
          <button 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleDodge}
          >
            Dodge!
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-gray-400 text-sm">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <ul className="list-disc pl-5">
          <li>Click Dodge to avoid incoming attacks</li>
          <li>Maintain health above 0</li>
          <li>Score 100 points to win</li>
          <li>Survive for 60 seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default GameArena;