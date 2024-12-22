# Poseidon Challenge

A Web3 game built on Solana using Poseidon and Next.js where players can stake tokens and compete in a skill-based challenge.

## Features

- Skill-based gameplay
- Token staking mechanism
- On-chain statistics
- Solana wallet integration
- Performance tracking

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (v1.0 or higher)
- [Rust](https://www.rust-lang.org/tools/install)
- [Solana CLI Tools](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://www.anchor-lang.com/)

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/poseidon-challenge.git
cd poseidon-challenge

2. Install dependencies:

bun install

3. Install and build Poseidon:

git clone https://github.com/Turbin3/poseidon
cd poseidon

4. Ensure your Rust toolchain is up-to-date:

rustup update stable

5. Update dependencies if there are version conflicts:

cargo update

6. Build Poseidon in release mode:

cargo build --release

**Note**: You might need to move the compiled binary or adjust your PATH:

mv target/release/poseidon ../bin/

or

export PATH=$PATH:/path/to/poseidon/target/release

7. Set up your environment variables:

cp .env.example .env.local
# Edit .env.local with your values

## Development

Run the development server:

bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

poseidon-challenge/
├── programs/              # Solana program files
│   └── src/
│       └── gameProgram.ts # Main game program
├── src/
│   ├── app/              # Next.js app router files
│   ├── components/       # React components
│   └── lib/             # Utility functions & constants
├── public/              # Static assets
├── tests/              # Program & UI tests
├── poseidon/            # Cloned Poseidon repository
└── bin/                # Compiled binaries

## Game Rules

1. Connect your Solana wallet
2. Stake tokens to start a game
3. Play the dodge game:
   - Avoid incoming attacks
   - Score points by successful dodges
   - Survive for 60 seconds
4. Win conditions:
   - Maintain health above 0
   - Score at least 100 points
   - Complete the time duration

## Deployment

This project is configured for GitHub Pages deployment. Push to main branch to trigger automatic deployment.

### Manual deployment:

bun run build

## Technologies Used

- [Next.js](https://nextjs.org/) - React Framework
- [Poseidon](https://github.com/Turbin3/poseidon) - Solana TypeScript Transpiler
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/) - Solana JavaScript API
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Statistics Visualization

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Turbin3](https://github.com/Turbin3) for Poseidon
- Solana Foundation
- The Web3 Gaming Community

## Dependency Management

### Rust Toolchain
Keep your Rust toolchain updated:

rustup update stable

### Project Dependencies
If you encounter dependency issues:

cargo update

### Poseidon Setup
After building Poseidon:
1. Move the binary: mv target/release/poseidon ../bin/
2. Or update PATH: export PATH=$PATH:/path/to/poseidon/target/release

## Troubleshooting

### Common Issues
- **Dependency Conflicts**: Update Rust toolchain and run cargo update
- **Build Failures**: Check Poseidon repository for updates and verify environment setup