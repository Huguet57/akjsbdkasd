/**
 * Provides reusable Web3 state and helpers to descendant components.
 *
 * @example
 * ```tsx
 * <Web3ContextProvider>
 *   <WalletSelector />
 * </Web3ContextProvider>
 * ```
 */
import { Address, Chain } from 'viem';
type Web3Context = {
    connect: {
        getUri: (id?: string) => string;
    };
    dapp: {
        chains: Chain[];
    };
    account?: {
        chain: Chain;
        chainIsSupported: boolean;
        address: Address;
    };
};
declare const Web3Context: import("react").Context<Web3Context>;
export declare const Web3ContextProvider: ({ enabled, children, }: {
    enabled?: boolean;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
/**
 * React hook to access the {@link Web3Context} values.
 *
 * @returns Shared Web3 utilities exposed by the provider.
 *
 * @example
 * ```ts
 * const { account } = useWeb3();
 * ```
 */
export declare const useWeb3: () => Web3Context;
export {};
