// src/lib/constants.ts

export const NETWORK = {
    ENDPOINT: process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com",
    PROGRAM_ID: process.env.NEXT_PUBLIC_PROGRAM_ID
}

export const GAME_CONFIG = {
    MIN_STAKE: 0.1, // SOL
    GAME_DURATION: 60, // seconds
    SCORE_TO_WIN: 100,
    HEALTH_LOSS: 20,
    SCORE_PER_DODGE: 10,
    DIFFICULTY_INCREASE: {
        INTERVAL: 10, // seconds
        MULTIPLIER: 1.2
    }
}