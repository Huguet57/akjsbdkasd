# privy-permissionless-7702

In this guide, we'll demonstrate how to use Pimlico, a bundler and paymaster service for ERC-4337 accounts, together with Privy to enable your users to send gasless (sponsored) transactions using EIP-7702 authorization.

> Want to see a full end to end example? Check out our starter repo [here](https://github.com/pimlicolabs/permissionless-privy-7702)!

## 0. Install dependencies

In your app's repository, install the required dependencies from Privy, Permissionless, and Viem:

```bash
npm i @privy-io/react-auth @privy-io/wagmi permissionless viem wagmi
```

## 1. Sign up for a Pimlico account and get your API key

Head to the Pimlico dashboard and create an account. Generate an API key and create a sponsorship policy for the network you plan to use (optional). Make note of your API key and sponsorship policy ID.

## 2. Configure Privy settings

Configure your app to create embedded wallets for all users.

```jsx
<PrivyProvider
  config={{
    embeddedWallets: {
      createOnLogin: 'all-users'
      showWalletUIs: true
    }
  }}
>
  ...
</PrivyProvider>
```

## 3. Create a simple smart account with Permissionless SDK

Permissionless provides a simple way to create a smart account client that can send user operations with EIP-7702 authorization. All you need is the user's embedded wallet and the Pimlico API key.

```jsx
import { usePrivy, useSignAuthorization, useWallets } from "@privy-io/react-auth"
import { useSetActiveWallet } from "@privy-io/wagmi"
import { useWalletClient } from "wagmi"
import { createPublicClient, createWalletClient, http, zeroAddress } from "viem"
import { sepolia } from "viem/chains"
import { createSmartAccountClient } from "permissionless"
import { createPimlicoClient } from "permissionless/clients/pimlico"
import { entryPoint08Address } from "viem/account-abstraction"
import { toSimpleSmartAccount } from "permissionless/accounts"

// Get the Privy embedded wallet
const { wallets } = useWallets()
const { data: walletClient } = useWalletClient()
const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy")

// Set the embedded wallet as active
const { setActiveWallet } = useSetActiveWallet()
useEffect(() => {
  if (embeddedWallet) {
    setActiveWallet(embeddedWallet)
  }
}, [embeddedWallet, setActiveWallet])

// Create a public client for the chain
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL)
})

// Create a Pimlico client
const pimlicoApiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY
const pimlicoUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${pimlicoApiKey}`
const pimlicoClient = createPimlicoClient({
  transport: http(pimlicoUrl)
})

// Create a simple smart account
const simpleSmartAccount = await toSimpleSmartAccount({
  owner: walletClient,
  entryPoint: {
    address: entryPoint08Address,
    version: "0.8"
  },
  client: publicClient,
  address: walletClient.account.address
})

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
```

## 4. Sign the EIP-7702 authorization

Privy provides a useSignAuthorization hook that allows you to sign an EIP-7702 authorization using the user's embedded wallet. This authorization is a cryptographic signature that allows an EOA to set its code to that of a smart contract, enabling the EOA to behave like a smart account.

```jsx
const { signAuthorization } = useSignAuthorization()

// Sign the EIP-7702 authorization
const authorization = await signAuthorization({
  contractAddress: "0xe6Cae83BdE06E4c305530e199D7217f42808555B", // Simple account implementation address
  chainId: sepolia.id,
  nonce: await publicClient.getTransactionCount({
    address: walletClient.account.address
  })
})
```

## 5. Send a gas-sponsored transaction

With the smart account client configured and the authorization signed, you can now send gasless UserOperations. Below we send an empty call to the zero address:

```jsx
const txnHash = await smartAccountClient.sendTransaction({
  calls: [
    {
      to: zeroAddress,
      data: "0x",
      value: BigInt(0)
    }
  ],
  factory: '0x7702',
  factoryData: '0x',
  paymasterContext: {
    sponsorshipPolicyId: process.env.NEXT_PUBLIC_SPONSORSHIP_POLICY_ID
  },
  authorization
})

console.log(`Transaction hash: ${txnHash}`)
console.log(`View on Etherscan: https://sepolia.etherscan.io/tx/${txnHash}`)
```

## Conclusion

That's it! You've just executed a gasless transaction from a normal EOA upgraded with EIP-7702 using Pimlico as the bundler and paymaster service.

Explore the rest of the [Pimlico docs](https://docs.pimlico.io/) to learn about advanced features like batching transactions, gas estimation, and more.

> Want to see a full end to end example? Check out our starter repo [here](https://github.com/pimlicolabs/permissionless-privy-7702)!