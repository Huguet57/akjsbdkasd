import "dotenv/config"
import { createSmartAccountClient } from "permissionless"
import { createPimlicoClient } from "permissionless/clients/pimlico"
import { http, createPublicClient, zeroAddress } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"
import { toSimpleSmartAccount } from "permissionless/accounts"
import { entryPoint08Address } from "viem/account-abstraction"

const privateKey = generatePrivateKey()

const pimlicoApiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY

if (!pimlicoApiKey || pimlicoApiKey === "YOUR_PIMLICO_API_KEY") {
    throw new Error(
        "Please set a valid Pimlico API key in your .env.local file"
    )
}

const pimlicoUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${pimlicoApiKey}`

const main = async () => {
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL!)
    })

    const pimlicoClient = createPimlicoClient({
        transport: http(pimlicoUrl)
    })

    const owner = privateKeyToAccount(privateKey)

    console.log(`Owner address: ${owner.address}`)

    const simpleSmartAccount = await toSimpleSmartAccount({
        owner,
        entryPoint: {
            address: entryPoint08Address,
            version: "0.8"
        },
        client: publicClient,
        address: owner.address
    })

    console.log(`Smart account address: ${simpleSmartAccount.address}`)

    // Create the smart account client
    const smartAccountClient = createSmartAccountClient({
        account: simpleSmartAccount,
        chain: sepolia,
        bundlerTransport: http(pimlicoUrl),
        paymaster: pimlicoClient,
        userOperation: {
            estimateFeesPerGas: async () => {
                return (await pimlicoClient.getUserOperationGasPrice()).fast
            }
        }
    })

    const userOp = await smartAccountClient.prepareUserOperation({
        calls: [
            {
                to: zeroAddress,
                data: "0x",
                value: BigInt(0)
            }
        ],
        paymasterContext: {
            sponsorshipPolicyId: process.env.NEXT_PUBLIC_SPONSORSHIP_POLICY_ID
        },
        factory: '0x7702',
        factoryData: '0x',
        authorization: await owner.signAuthorization({
            contractAddress: "0xe6Cae83BdE06E4c305530e199D7217f42808555B",
            chainId: sepolia.id,
            nonce: 0
        })
    })

    console.log("User Operation:")
    console.log(userOp)

    const userOpHash = await smartAccountClient.sendUserOperation({
        ...userOp,
        signature: await simpleSmartAccount.signUserOperation(userOp)
    })

    console.log("User Operation Hash:")
    console.log(userOpHash)

    const transactionHash =
        await smartAccountClient.waitForUserOperationReceipt({
            hash: userOpHash
        })

    console.log("Transaction Hash:")
    console.log(transactionHash.receipt.transactionHash)
}

main()
    .catch(console.error)
    .finally(() => process.exit(0))
