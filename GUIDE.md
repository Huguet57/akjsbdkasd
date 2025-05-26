---
title: Integrating with EIP-7702
---
[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) is an upgrade to EVM blockchains that enables externally owned accounts (EOAs) to set their code to that of a smart contract. In practical terms, this means that EOA wallets will gain AA (account abstraction) capabilities such as transaction bundling, gas sponsorship, and custom permissions.
Privy supports all low level interfaces required by 7702 - signing authorizations and sending type 4 transactions, allowing you to use any implementation of EIP-7702. Use the following guides to get started with EIP-7702 in your application:
### Signing EIP-7702 authorizations
Privy provides a `useSignAuthorization` hook that allows you to sign an EIP-7702 authorization using the user's embedded wallet. This authorization is a cryptographic signature that allows an EOA to set its code to that of a smart contract, enabling the EOA to behave like a smart account.
```tsx
import {useSignAuthorization} from '@privy-io/react-auth';
const {signAuthorization} = useSignAuthorization();
const authorization = signAuthorization({
  contractAddress: '0x1234567890abcdef1234567890abcdef12345678', // The address of the smart contract
  chainId: chain.id
});
```
Learn more about using the signed authorization in the guides below!
### Using EIP-7702 capabilities
<Tab title="Pimlico">

In this guide, we'll demonstrate how to use Pimlico, a bundler and paymaster service for ERC-4337 accounts, together with Privy to enable your users to send gasless (sponsored) transactions using EIP-7702 authorization.

<Info>
  Want to see a full end to end example? Check out our starter repo [here](https://github.com/pimlicolabs/permissionless-privy-7702)!
</Info>

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

<Info>
  Want to see a full end to end example? Check out our starter repo [here](https://github.com/pimlicolabs/permissionless-privy-7702)!
</Info>

</Tab>

<Tabs>
<Tab title="ZeroDev">
In this guide, we demonstrate using [ZeroDev](https://zerodev.app/), a toolkit for creating smart accounts, together with Privy to enable your users to send gasless (sponsored) transactions.
<Info>
  Want to see a full end to end example? Check out our starter repo
  [here](https://github.com/privy-io/create-next-app/tree/7702/zerodev)!
</Info>
### 0. Install dependencies
In your app's repository, install the required dependencies from Privy, ZeroDev and [`viem`](https://www.npmjs.com/package/viem):
```sh
npm i @privy-io/react-auth @zerodev/sdk @zerodev/ecdsa-validator viem
```
### 1. Sign up for a ZeroDev account and create a project
Head to the [**ZeroDev dashboard**](https://dashboard.zerodev.app/) and create a project on a chain that supports EIP-7702.
Set up a [gas sponsorship policy](https://dashboard.zerodev.app/paymasters) to enable sending sponsored transactions. Copy the **Bundler RPC** and **Paymaster RPC** for the network you plan to use.
### 2. Configure Privy settings
Configure your app to create embedded wallets for all users. Also configure Privy to not show its default wallet UIs. Instead, we recommend you use your own custom UIs for showing users the user operations they sign.
Update your `PrivyProvider` configuration to include the following properties:
```tsx
<PrivyProvider
  config={{
    embeddedWallets: {
      showWalletUIs: false, // [!code ++]
      createOnLogin: 'all-users' // [!code ++]
    }
  }}
>
  ...
</PrivyProvider>
```
### 3. Create a 7702 Kernel account with the ZeroDev SDK
ZeroDev exposes helper functions that take care of generating the 7702 authorization for you. All you need to provide is the signer for the user's embedded wallet and the Kernel version you want to use.
```tsx
import {create7702KernelAccount, create7702KernelAccountClient} from '@zerodev/ecdsa-validator';
import {createZeroDevPaymasterClient} from '@zerodev/sdk';
import {KERNEL_V3_3} from '@zerodev/sdk/constants';
import {getEntryPoint} from '@zerodev/sdk/constants';
import {createWalletClient, createPublicClient, custom, http, zeroAddress, Hex} from 'viem';
import {odysseyTestnet} from 'viem/chains';
// Select the chain and Kernel version you want to use
const chain = odysseyTestnet;
const kernelVersion = KERNEL_V3_3;
const kernelAddresses = KernelVersionToAddressesMap[kernelVersion];
const entryPoint = getEntryPoint('0.7');
// Grab the embedded wallet created by Privy
const {wallets} = useWallets();
const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
// Build viem clients for the wallet & public RPC
const walletClient = createWalletClient({
  account: embeddedWallet.address as Hex,
  chain,
  transport: custom(await embeddedWallet.getEthereumProvider())
});
const publicClient = createPublicClient({
  chain,
  transport: http()
});
// Sign the EIP-7702 authorization (signAuthorization is from the useSignAuthorization hook)
const authorization = signAuthorization({
  contractAddress: kernelAddresses.accountImplementationAddress,
  chainId: chain.id
});
// Create the 7702 Kernel account (no deployment occurs!)
const account = await create7702KernelAccount(publicClient, {
  signer: walletClient,
  entryPoint,
  kernelVersion,
  eip7702Auth: authorization
});
```
Behind the scenes ZeroDev generates the EIP-7702 authorization and binds the Kernel implementation code to the EOA, giving it smart-account super-powers while keeping the same address.
### 4. Configure the ZeroDev client for sponsored transactions
```tsx
const paymasterRpc = 'YOUR_PAYMASTER_RPC_URL';
const bundlerRpc = 'YOUR_BUNDLER_RPC_URL';
// Create a paymaster client so the user does not need ETH
const paymasterClient = createZeroDevPaymasterClient({
  chain,
  transport: http(paymasterRpc)
});
// Build a Kernel client that will create & submit UserOperations
const kernelClient = create7702KernelAccountClient({
  account,
  chain,
  bundlerTransport: http(bundlerRpc),
  paymaster: paymasterClient,
  client: publicClient
});
```
### 5. Send a gas-sponsored transaction
With the client configured, you can now send gasless UserOperations. Below we send an empty call then wait for it to be mined:
```tsx
// Send a simple UserOperation
const userOpHash = await kernelClient.sendUserOperation({
  callData: await kernelClient.account.encodeCalls([
    {
      to: zeroAddress,
      value: BigInt(0),
      data: '0x'
    }
  ])
});
// Wait for the operation to be included
const {receipt} = await kernelClient.waitForUserOperationReceipt({
  hash: userOpHash
});
console.log(
  'UserOp completed',
  `${chain.blockExplorers.default.url}/tx/${receipt.transactionHash}`
);
```
### Conclusion
That's it! You've just executed a gasless transaction from a normal EOA upgraded with EIP-7702.
Explore the rest of the [ZeroDev docs](https://docs.zerodev.app/) to learn about batching, session keys, cross-chain actions and more.
</Tab>
<Tab title="Alchemy">
In this guide, we will transform your Privy embedded wallet into a smart wallet with features like gas sponsorship, batch transactions, granular permissions, and more [using EIP-7702](https://www.alchemy.com/docs/wallets/react/using-7702) support from Alchemy.
### 0. Install dependencies
In your app's repository, install the required dependencies from Privy, Alchemy, and [`viem`](https://www.npmjs.com/package/viem):
<Warning>The Alchemy SDK currently requires `viem` to be pinned to 2.22.6</Warning>
```sh
npm i @privy-io/react-auth @account-kit/smart-contracts @account-kit/infra @aa-sdk/core viem@2.22.6
```
### 1. Create an Alchemy account and get your API key
- **Create an app:** visit the Alchemy [dashboard](https://dashboard.alchemy.com/apps) to create a new app, if you don't already have one.
  - Make sure to enable networks that support EIP-7702 such as Ethereum Mainnet or Sepolia.
  - Save the app's **API Key** that will be used later.
- **Enable gas sponsorship:** visit the [Gas Manager](https://dashboard.alchemy.com/gas-manager) dashboard and create a new sponsorship policy for the app you created in step 1. This policy will be used to set rules on how much of user's gas you want to sponsor.
  - Make sure to enable gas sponsorship on a chain that support EIP-7702 such as Ethereum Mainnet or Sepolia.
  - Save the **Policy ID** that will be used later.
Now that you have your API key and Policy ID, you can set up your smart wallets.
### 2. Configure Privy settings
If you're already using a Privy embedded wallet, update your configuration to support EIP-7702 with embedded wallets. If you don't yet have authentication configured, you can follow [this](https://www.alchemy.com/docs/wallets/react/using-7702) guide to get set up.
Make sure your `PrivyProvider` has the following `embeddedWallets` settings and ensure you set the `defaultChain` and `supportedChains` to the 7702 supported chain you chose in step 1.
```tsx
import { sepolia } from "@account-kit/infra";
<PrivyProvider
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
    config={{
      embeddedWallets: {
        showWalletUIs: false,
        createOnLogin: "all-users",
      },
      defaultChain: sepolia,
      supportedChains: [sepolia],
    }}
>
```
### 3. Adapt Privy signer to a smart account signer
Now that you have authentication working, adapt the Privy signer to be able to sign 7702 authorizations to upgrade to smart accounts.
**1. Get the Privy embedded wallet**
```tsx
import {useWallets} from '@privy-io/react-auth';
const {wallets} = useWallets();
const embeddedWallet = wallets.find((x) => x.walletClientType === 'privy');
```
**2. Create a `SmartAccountSigner` instance**
```tsx
import {sepolia, alchemy} from '@account-kit/infra'; // make sure to import your chain from account-kit, not viem
import {useSignAuthorization} from '@privy-io/react-auth';
import {SmartAccountSigner, WalletClientSigner} from '@aa-sdk/core';
import {createWalletClient, custom, Hex} from 'viem';
import {Authorization} from 'viem/experimental';
const {signAuthorization} = useSignAuthorization();
async function create7702signer() {
  const baseSigner = new WalletClientSigner(
    createWalletClient({
      account: embeddedWallet!.address as Hex,
      chain: sepolia,
      transport: custom(await embeddedWallet!.getEthereumProvider())
    }),
    'privy'
  );
  const signer: SmartAccountSigner = {
    getAddress: baseSigner.getAddress,
    signMessage: baseSigner.signMessage,
    signTypedData: baseSigner.signTypedData,
    signerType: baseSigner.signerType,
    inner: baseSigner.inner,
    signAuthorization: async (
      unsignedAuth: Authorization<number, false>
    ): Promise<Authorization<number, true>> => {
      const signature = await signAuthorization(unsignedAuth);
      return {
        ...unsignedAuth,
        ...{
          r: signature.r!,
          s: signature.s!,
          v: signature.v!
        }
      };
    }
  };
  return signer;
}
```
### 4. Upgrade to smart accounts and send sponsored transactions
Now that you have a `SmartAccountSigner` instance, follow [this guide](https://www.alchemy.com/docs/wallets/smart-contracts/modular-account-v2/using-7702#using-eip-7702) to create a smart account client (`createModularAccountV2Client` ) and start sending sponsored transactions. You'll need:
- the `SmartAccountSigner` instance defined in step 3
- the API key and the policy ID from step 1
Once you define the client, you can send sponsored transactions with your embedded EOA and access other advanced smart account features! This client will handle all of the logic of delegating to a new smart account, if not already, and signing transactions. If you don't yet have a signer, follow [this guide](https://www.alchemy.com/docs/wallets/react/using-7702) to get set up.
### Next steps
You just upgraded your EOA and sent your first sponsored transaction using EIP-7702!
If you want to leverage other smart account capabilities such as batching and permissions, check out the [Alchemy docs](https://www.alchemy.com/docs/wallets).
</Tab>
<Tab title="Biconomy">
In this guide, we demonstrate using [Biconomy's](https://biconomy.io/) Modular Execution Environments, together with Privy to enable your users to send cross chain transactions.
### 0. Install dependencies
In your app's repository, install the required dependencies:
```sh
npm i @privy-io/react-auth @biconomy/abstractjs viem @rhinestone/module-sdk@0.2.7
```
### 1. Sign up for a Biconomy account and get your project ID
Visit the [**Biconomy dashboard**](https://dashboard.biconomy.io/) and sign up for a new account if you do not have one already.
### 2. Follow Biconomy setup instructions
Follow the [Biconomy integration guide](https://docs.biconomy.io/eip7702/wallet-guide#eip7702-integration-guide-for-wallets) to set up the rest of your project using Biconomy's AbstractJS SDK!
</Tab>
</Tabs>
