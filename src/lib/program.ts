// src/lib/program.ts

import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { NETWORK } from './constants';

export interface GameStats {
  totalGames: number;
  wins: number;
  highScore: number;
  recentGames: Array<{
    date: string;
    score: number;
    won: boolean;
  }>;
}

class GameProgramClient {
  private connection: Connection;
  private programId: PublicKey;

  constructor() {
    this.connection = new Connection(NETWORK.ENDPOINT);
    this.programId = new PublicKey(NETWORK.PROGRAM_ID);
  }

  async lockTokens(amount: number, walletPublicKey: PublicKey): Promise<string> {
    // This would be implemented with actual program calls
    // For now, return mock transaction
    return 'mock_transaction_id';
  }

  async finishGame(
    won: boolean, 
    score: number, 
    walletPublicKey: PublicKey
  ): Promise<string> {
    // This would be implemented with actual program calls
    return 'mock_transaction_id';
  }

  async getPlayerStats(walletPublicKey: PublicKey): Promise<GameStats> {
    // Mock stats for now
    return {
      totalGames: 10,
      wins: 4,
      highScore: 150,
      recentGames: [
        { date: '2024-02-20', score: 120, won: true },
        { date: '2024-02-19', score: 80, won: false },
        { date: '2024-02-18', score: 150, won: true },
      ]
    };
  }

  async getBalance(walletPublicKey: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(walletPublicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }
}

export const gameProgram = new GameProgramClient();