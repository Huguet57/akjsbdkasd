import { type AuthorizationRequest, type SignedAuthorization } from 'viem';
export type SignAuthorizationParameters = AuthorizationRequest;
export type SignAuthorizationReturnType = SignedAuthorization;
/**
 * Hook for signing EIP-7702 wallet authorizations
 *
 * This hook leverages the embedded Openfort client to sign authorization payloads prepared via viem.
 * It mirrors viem's `signAuthorization` behaviour while always returning the structured authorization object,
 * keeping private key management inside the Openfort SDK.
 *
 * @returns Helper with a `signAuthorization` function that signs authorizations with the active Openfort wallet
 *
 * @example
 * ```ts
 * import { prepareAuthorization } from 'viem/actions';
 * import { useAuthorization } from '@openfort/openfort-react';
 *
 * const { signAuthorization } = useAuthorization();
 *
 * const authorization = await prepareAuthorization(pimlicoClient, {
 *   account: eoaAccount.address,
 *   contractAddress: implementationAddress,
 * });
 *
 * const signedAuthorization = await signAuthorization({
 *   ...authorization,
 * });
 * ```
 */
export declare function useAuthorization(): {
    signAuthorization: (parameters: SignAuthorizationParameters) => Promise<SignAuthorizationReturnType>;
};
