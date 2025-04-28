import "dotenv/config";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { createPublicClient, http, zeroAddress } from "viem";
import { entryPoint07Address, toSimple7702SmartAccount } from "viem/account-abstraction";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from 'viem/accounts'
import { createSmartAccountClient } from "permissionless";


const privateKey = "0x5f992d7dcec6ea7d729c0107356ee38fd0fae75d3328c5280dccbb8915b2227b"

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
              entryPoint: {
                address: entryPoint07Address,
                version: '0.7',
              },
            });

      const simpleSmartAccount = await toSimple7702SmartAccount({
        owner: privateKeyToAccount(privateKey),
        client: publicClient,
      })

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
      const userOp = await smartAccountClient.prepareUserOperation({
        calls: [{
          to: zeroAddress,
          data: '0x',
          value: BigInt(0),
        }],
      })

      console.log('userOp')
      console.log(userOp)
}

main().catch(console.error).finally(() => process.exit(0));
