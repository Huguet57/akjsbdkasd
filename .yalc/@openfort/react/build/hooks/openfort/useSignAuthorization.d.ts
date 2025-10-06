import { Hex } from "viem";
import { OpenfortError, OpenfortHookOptions } from "../../types";
export type SignedAuthorization = {
    chainId: number;
    contractAddress: Hex;
    nonce: bigint;
    r: Hex;
    s: Hex;
    yParity: number;
};
export type SignAuthorizationOptions = {
    contractAddress: Hex;
    chainId?: number;
    nonce?: bigint;
} & OpenfortHookOptions<{
    authorization: SignedAuthorization;
}>;
/**
 * Hook for signing EIP-7702 authorizations using Openfort embedded wallet
 *
 * This hook allows signing EIP-7702 authorizations to delegate a contract onto an EOA account.
 * The signed authorization can be used in transaction APIs like sendTransaction and writeContract.
 *
 * @param hookOptions - Optional configuration with callback functions
 * @returns Signing status and signAuthorization function
 *
 * @example
 * ```tsx
 * const { signAuthorization, isSigning } = useSignAuthorization({
 *   onSuccess: (result) => console.log('Authorization signed:', result.authorization),
 *   onError: (error) => console.error('Signing failed:', error),
 * });
 *
 * // Sign an authorization
 * const result = await signAuthorization({
 *   contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   chainId: 10,
 *   nonce: 420n,
 * });
 *
 * if ('authorization' in result) {
 *   // Use the signed authorization in a transaction
 *   await sendTransaction({
 *     authorizationList: [result.authorization],
 *     // ... other transaction params
 *   });
 * }
 * ```
 */
export declare function useSignAuthorization(hookOptions?: OpenfortHookOptions<{
    authorization: SignedAuthorization;
}>): {
    error: OpenfortError | null | undefined;
    isError: boolean;
    isSuccess: boolean;
    isSigning: boolean;
    signAuthorization: (options: SignAuthorizationOptions) => Promise<{
        error: OpenfortError;
    } | {
        authorization: SignedAuthorization;
    }>;
    reset: () => void;
};
