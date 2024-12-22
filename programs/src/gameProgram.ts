// programs/src/gameProgram.ts

import { 
    Account, 
    AssociatedTokenAccount, 
    Mint, 
    Pubkey, 
    Signer, 
    TokenAccount, 
    TokenProgram, 
    UncheckedAccount, 
    u64,
    u8,
    boolean
} from "@solanaturbine/poseidon";

export default class GameProgram {
    static PROGRAM_ID = new Pubkey("11111111111111111111111111111111");

    lockTokens(
        player: Signer,
        gameState: GameState,
        playerAta: AssociatedTokenAccount,
        tokenMint: Mint,
        auth: UncheckedAccount,
        vault: TokenAccount,
        amount: u64
    ) {
        playerAta.derive(tokenMint, player.key)
        auth.derive(["auth"])
        vault.derive(["vault", gameState.key], tokenMint, auth.key).init(player)
        
        gameState.derive(["game", player.key])
            .init(player)

        gameState.player = player.key;
        gameState.tokenMint = tokenMint.key;
        gameState.amount = amount;
        gameState.gameStarted = true;
        gameState.playerWon = false;

        TokenProgram.transfer(
            playerAta,
            vault,
            player,
            amount
        )
    }

    finishGame(
        player: Signer,
        gameState: GameState,
        playerAta: AssociatedTokenAccount,
        tokenMint: Mint,
        auth: UncheckedAccount,
        vault: TokenAccount,
        won: boolean
    ) {
        playerAta.derive(tokenMint, player.key)
        gameState.derive(["game", player.key])
            .has([player])

        gameState.playerWon = won;
        
        // Always return tokens for safety
        TokenProgram.transfer(
            vault,
            playerAta,
            auth,
            gameState.amount,
            ["auth", auth.getBump()]
        )
    }
}

export interface GameState extends Account {
    player: Pubkey
    tokenMint: Pubkey
    amount: u64
    gameStarted: boolean
    playerWon: boolean
    gamesPlayed: u64
    highScore: u64
}