'use client';

import { usePrivy, useSignAuthorization, useWallets } from '@privy-io/react-auth';
import { createSmartAccountClient } from 'permissionless';
import { toSimpleSmartAccount } from 'permissionless/accounts';
import { createPublicClient, http, zeroAddress } from 'viem';
import { sepolia } from 'viem/chains';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { entryPoint07Address, toSimple7702SmartAccount } from 'viem/account-abstraction';
import { privateKeyToAccount } from 'viem/accounts';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { useSetActiveWallet } from '@privy-io/wagmi';

export function UserOperation() {
  const { user, authenticated, login, logout, ready } = usePrivy();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {signAuthorization} = useSignAuthorization();

  const { wallets } = useWallets()
  const { data: walletClient } = useWalletClient()  

  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  )

  const { setActiveWallet } = useSetActiveWallet()

  useEffect(() => {
    if (embeddedWallet) {
      setActiveWallet(embeddedWallet)
    }
  }, [embeddedWallet, setActiveWallet])
  
  const sendUserOperation = async () => {
    if (!user || !user.wallet?.address) {
      setError('No wallet connected');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const pimlicoApiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;
      
      if (!pimlicoApiKey || pimlicoApiKey === 'YOUR_PIMLICO_API_KEY') {
        throw new Error('Please set a valid Pimlico API key in your .env.local file');
      }
      
      const pimlicoUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${pimlicoApiKey}`;
      
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL!),
      });
      
      const pimlicoClient = createPimlicoClient({
        transport: http(pimlicoUrl),
        entryPoint: {
          address: entryPoint07Address,
          version: '0.7',
        },
      });

      console.log('wallets')
      console.log(wallets)
      console.log('walletClient')
      console.log(walletClient)
      
      // Get the Privy wallet provider
      if (!user.wallet || !walletClient) {
        throw new Error('No wallet found');
      }

      const simpleSmartAccount = await toSimple7702SmartAccount({
        // @ts-ignore
        owner: walletClient.account,
        client: publicClient,
      })

      console.log('factoryArgs')
      console.log(await simpleSmartAccount.getFactoryArgs())
      
      // Create the smart account client
      const smartAccountClient = createSmartAccountClient({
        account: simpleSmartAccount,
        chain: sepolia,
        bundlerTransport: http(pimlicoUrl),
        paymaster: pimlicoClient,
        userOperation: {
          estimateFeesPerGas: async () => {
            return (await pimlicoClient.getUserOperationGasPrice()).fast;
          },
        },
      });

      // const authorization = await signAuthorization({
      //   contractAddress: '0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985',
      //   chainId: sepolia.id
      // })

      // console.log('authorization')
      // console.log(authorization)

      const userOp = await smartAccountClient.prepareUserOperation({
        calls: [{
          to: zeroAddress,
          data: '0x',
          value: BigInt(0),
        }],
        // authorization
      })

      console.log('userop')
      console.log(userOp)

      const userOpHash = await smartAccountClient.sendUserOperation(userOp)

      console.log('useropHash')
      console.log(userOpHash)

      const hash = await publicClient.waitForTransactionReceipt({
        hash: userOpHash
      })

      console.log('hash')
      console.log(hash.transactionHash)
      
      setTxHash(hash.transactionHash);
    } catch (err) {
      console.error('Error sending user operation:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Privy + Permissionless Demo</h1>
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login with Privy
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Privy + Permissionless Demo</h1>
      
      <div className="bg-gray-100 p-4 rounded w-full max-w-md">
        <p className="font-semibold">Connected Address:</p>
        <p className="break-all">{walletClient?.account.address || 'No address available'}</p>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={sendUserOperation}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send UserOp'}
        </button>
        
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      {txHash && (
        <div className="bg-green-100 p-4 rounded w-full max-w-md">
          <p className="font-semibold">Transaction Hash:</p>
          <p className="break-all">{txHash}</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on Etherscan
          </a>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 p-4 rounded w-full max-w-md">
          <p className="font-semibold">Error:</p>
          <p className="break-all">{error}</p>
        </div>
      )}
    </div>
  );
}
