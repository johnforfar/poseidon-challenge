// src/app/page.tsx

'use client';

import { useState } from 'react';
import GameArena from '@/components/GameArena';
import PlayerStats from '@/components/PlayerStats';
import WalletButton from '@/components/WalletButton';
import { gameProgram } from '@/lib/program';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>();
  const [balance, setBalance] = useState<number>();
  const [stats, setStats] = useState({
    totalGames: 0,
    wins: 0,
    highScore: 0,
    recentGames: []
  });

  const handleConnect = async () => {
    // This would be implemented with actual wallet connection
    setIsConnected(true);
    setPublicKey("11111111111111111111111111111111");
    setBalance(1.5);
    
    // Fetch player stats
    if (publicKey) {
      const playerStats = await gameProgram.getPlayerStats(
        publicKey as any
      );
      setStats(playerStats);
    }
  };

  const handleGameComplete = async (won: boolean, score: number) => {
    if (!publicKey) return;
    
    try {
      await gameProgram.finishGame(won, score, publicKey as any);
      // Refresh stats
      const newStats = await gameProgram.getPlayerStats(publicKey as any);
      setStats(newStats);
    } catch (error) {
      console.error('Failed to complete game:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Poseidon Challenge</h1>
        <WalletButton
          onConnect={handleConnect}
          isConnected={isConnected}
          publicKey={publicKey}
          balance={balance}
        />
      </div>

      {/* Game Area */}
      <GameArena
        onGameComplete={handleGameComplete}
        tokenAmount={0.1}
        isLoading={!isConnected}
      />

      {/* Stats */}
      {isConnected && <PlayerStats stats={stats} />}
    </div>
  );
}