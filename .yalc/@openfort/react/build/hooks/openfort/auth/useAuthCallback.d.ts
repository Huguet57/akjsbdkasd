import { UIAuthProvider } from "../../../components/Openfort/types";
import { OpenfortError, OpenfortHookOptions } from "../../../types";
import { CreateWalletPostAuthOptions } from "./useConnectToWalletPostAuth";
import { EmailVerificationResult } from "./useEmailAuth";
import { StoreCredentialsResult } from "./useOAuth";
type CallbackResult = (StoreCredentialsResult & {
    type: "storeCredentials";
}) | (EmailVerificationResult & {
    type: "verifyEmail";
});
type UseAuthCallbackOptions = {
    enabled?: boolean;
} & OpenfortHookOptions<CallbackResult> & CreateWalletPostAuthOptions;
/**
 * Hook for handling authentication callbacks from OAuth providers and email verification
 *
 * This hook automatically processes authentication callbacks when the page loads with
 * authentication parameters in the URL. It handles both OAuth provider callbacks
 * (with access tokens) and email verification callbacks (with state tokens).
 * The hook extracts parameters from the URL and automatically calls the appropriate
 * authentication methods, then cleans up the URL parameters.
 *
 * @param options - Optional configuration with callback functions and authentication options
 * @returns Current callback processing state and extracted information
 *
 * @example
 * ```tsx
 * const authCallback = useAuthCallback({
 *   enabled: true,
 *   onSuccess: (result) => {
 *     if (result.type === 'storeCredentials') {
 *       console.log('OAuth callback processed:', result.user);
 *     } else if (result.type === 'verifyEmail') {
 *       console.log('Email verified:', result.email);
 *     }
 *   },
 *   onError: (error) => console.error('Callback processing failed:', error),
 *   recoverWalletAutomatically: true,
 * });
 *
 * // Check callback processing state
 * if (authCallback.isLoading) {
 *   console.log('Processing authentication callback...');
 * } else if (authCallback.isError) {
 *   console.error('Callback error:', authCallback.error);
 * } else if (authCallback.isSuccess) {
 *   console.log('Callback processed successfully');
 * }
 *
 * // Access extracted information
 * if (authCallback.provider) {
 *   console.log('Authentication provider:', authCallback.provider);
 * }
 *
 * if (authCallback.email) {
 *   console.log('Email from callback:', authCallback.email);
 * }
 *
 * // Manually trigger verification (if needed)
 * const handleManualVerification = async () => {
 *   await authCallback.verifyEmail({
 *     email: 'user@example.com',
 *     state: 'verification-token',
 *   });
 * };
 *
 * // Manually store credentials (if needed)
 * const handleManualStore = async () => {
 *   await authCallback.storeCredentials({
 *     player: 'player-id',
 *     accessToken: 'access-token',
 *     refreshToken: 'refresh-token',
 *   });
 * };
 * ```
 */
export declare const useAuthCallback: ({ enabled, ...hookOptions }?: UseAuthCallbackOptions) => {
    email: string | null;
    provider: UIAuthProvider | null;
    verifyEmail: (options: import("./useEmailAuth").VerifyEmailOptions) => Promise<EmailVerificationResult>;
    storeCredentials: ({ player, accessToken, refreshToken, ...options }: import("./useOAuth").StoreCredentialsOptions) => Promise<StoreCredentialsResult>;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: OpenfortError | null | undefined;
};
export {};
