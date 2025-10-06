import { UserWallet } from "../useWallets";
/**
 * Options that control the behaviour of {@link useConnectToWalletPostAuth} when attempting to
 * recover or create an embedded wallet after authentication.
 */
export type CreateWalletPostAuthOptions = {
    /**
     * Whether the user should be signed out if automatic wallet creation fails.
     *
     * @defaultValue true
     */
    logoutOnError?: boolean;
    /**
     * Whether the hook should automatically attempt to recover an existing wallet that
     * supports automatic recovery.
     *
     * @defaultValue true
     */
    recoverWalletAutomatically?: boolean;
};
/**
 * React hook that attempts to recover or create an embedded wallet once a user has authenticated.
 *
 * @returns Helpers that execute the post-authentication wallet connection flow.
 *
 * @example
 * ```ts
 * const { tryUseWallet } = useConnectToWalletPostAuth();
 *
 * const result = await tryUseWallet({ recoverWalletAutomatically: false });
 * if (!result.wallet) {
 *   console.warn('No embedded wallet available after authentication');
 * }
 * ```
 */
export declare const useConnectToWalletPostAuth: () => {
    tryUseWallet: ({ logoutOnError: signOutOnError, recoverWalletAutomatically }: CreateWalletPostAuthOptions) => Promise<{
        wallet?: UserWallet;
    }>;
};
