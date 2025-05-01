import 'dotenv/config';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createPublicClient, http, zeroAddress } from 'viem';
import { entryPoint07Address, toSimple7702SmartAccount } from 'viem/account-abstraction';
import { sepolia } from 'viem/chains';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { createSmartAccountClient } from 'permissionless';

const privateKey = generatePrivateKey();

const pimlicoApiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

if (!pimlicoApiKey || pimlicoApiKey === 'YOUR_PIMLICO_API_KEY') {
  throw new Error('Please set a valid Pimlico API key in your .env.local file');
}

const pimlicoUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${pimlicoApiKey}`;

const main = async () => {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL!),
  });

  const pimlicoClient = createPimlicoClient({
    transport: http(pimlicoUrl),
  });

  const owner = privateKeyToAccount(privateKey)

  const simpleSmartAccount = await toSimple7702SmartAccount({
    owner,
    client: publicClient,
  });

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

  const tx = await smartAccountClient.sendTransaction({
    calls: [
      {
        to: zeroAddress,
        data: '0x',
        value: BigInt(0),
      },
    ],
    authorization: await owner.signAuthorization({
      contractAddress: '0xe6Cae83BdE06E4c305530e199D7217f42808555B',
      chainId: sepolia.id,
      nonce: 0
    })
  });

  console.log('Transaction hash:');
  console.log(tx);
};

main()
  .catch(console.error)
  .finally(() => process.exit(0));
