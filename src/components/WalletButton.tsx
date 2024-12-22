// src/components/WalletButton.tsx

import { useState } from 'react';

interface WalletButtonProps {
  onConnect: () => Promise<void>;
  isConnected: boolean;
  publicKey?: string;
  balance?: number;
  className?: string;
}

const WalletButton = ({ 
  onConnect, 
  isConnected, 
  publicKey, 
  balance,
  className = "" 
}: WalletButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await onConnect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
    setIsLoading(false);
  };

  // Format public key for display
  const formatPublicKey = (key: string) => {
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {isConnected && publicKey ? (
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
          <span className="text-sm text-gray-300">
            {formatPublicKey(publicKey)}
          </span>
          {balance !== undefined && (
            <span className="text-sm text-green-400">
              {balance.toFixed(2)} SOL
            </span>
          )}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-white" />
              Connecting...
            </>
          ) : (
            'Connect Wallet'
          )}
        </button>
      )}
    </div>
  );
};

export default WalletButton;