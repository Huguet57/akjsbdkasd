import { OAuthProvider } from '@openfort/openfort-js';
import { OpenfortHookOptions, OpenfortError } from '../../../types';
import { CreateWalletPostAuthOptions } from './useConnectToWalletPostAuth';
import { UserWallet } from "../useWallets";
import { type AuthPlayerResponse as OpenfortUser } from '@openfort/openfort-js';
export type InitializeOAuthOptions = {
    provider: OAuthProvider;
    redirectTo?: string;
} & OpenfortHookOptions<InitOAuthReturnType>;
export type InitOAuthReturnType = {
    error?: OpenfortError;
};
export type StoreCredentialsResult = {
    user?: OpenfortUser;
    wallet?: UserWallet;
    error?: OpenfortError;
};
export type StoreCredentialsOptions = {
    player: string;
    accessToken: string;
    refreshToken: string;
} & OpenfortHookOptions<StoreCredentialsResult> & CreateWalletPostAuthOptions;
export type AuthHookOptions = {
    redirectTo?: string;
} & OpenfortHookOptions<StoreCredentialsResult | InitOAuthReturnType> & CreateWalletPostAuthOptions;
/**
 * Hook for OAuth-based authentication operations
 *
 * This hook manages OAuth authentication flows including provider initialization,
 * credential storage, and wallet connection after successful OAuth authentication.
 * It supports multiple OAuth providers and handles the complete authentication lifecycle
 * from provider selection to wallet setup.
 *
 * @param hookOptions - Optional configuration with callback functions and authentication options
 * @returns Current OAuth authentication state and actions
 *
 * @example
 * ```tsx
 * const oauth = useOAuth({
 *   onInitializeOAuthSuccess: (result) => console.log('OAuth initialized'),
 *   onInitializeOAuthError: (error) => console.error('OAuth init failed:', error),
 *   onStoreCredentialsSuccess: (result) => console.log('Authenticated:', result.user),
 *   redirectTo: 'https://yourapp.com/auth/callback',
 *   recoverWalletAutomatically: true,
 * });
 *
 * // Initialize OAuth with a provider
 * const handleGoogleAuth = async () => {
 *   await oauth.initOAuth({
 *     provider: OAuthProvider.GOOGLE,
 *     redirectTo: 'https://yourapp.com/auth/callback',
 *   });
 * };
 *
 * const handleDiscordAuth = async () => {
 *   await oauth.initOAuth({
 *     provider: OAuthProvider.DISCORD,
 *   });
 * };
 *
 * // Store OAuth credentials (typically called from callback handler)
 * const handleStoreCredentials = async () => {
 *   await oauth.storeCredentials({
 *     player: 'player-id-from-callback',
 *     accessToken: 'access-token-from-callback',
 *     refreshToken: 'refresh-token-from-callback',
 *   });
 * };
 *
 * // Link OAuth provider to existing authenticated account
 * const handleLinkOAuth = async () => {
 *   await oauth.linkOauth({
 *     provider: OAuthProvider.GOOGLE,
 *     redirectTo: 'https://yourapp.com/auth/callback',
 *   });
 * };
 *
 * // Check authentication state
 * if (oauth.isLoading) {
 *   console.log('Processing OAuth authentication...');
 * } else if (oauth.isError) {
 *   console.error('OAuth error:', oauth.error);
 * } else if (oauth.isSuccess) {
 *   console.log('OAuth authentication successful');
 * }
 *
 * // Example usage in component with multiple providers
 * return (
 *   <div>
 *     <button onClick={handleGoogleAuth} disabled={oauth.isLoading}>
 *       Sign in with Google
 *     </button>
 *     <button onClick={handleDiscordAuth} disabled={oauth.isLoading}>
 *       Sign in with Discord
 *     </button>
 *   </div>
 * );
 * ```
 */
export declare const useOAuth: (hookOptions?: AuthHookOptions) => {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: OpenfortError | null | undefined;
    initOAuth: (options: InitializeOAuthOptions) => Promise<InitOAuthReturnType>;
    linkOauth: (options: InitializeOAuthOptions) => Promise<InitOAuthReturnType>;
    storeCredentials: ({ player, accessToken, refreshToken, ...options }: StoreCredentialsOptions) => Promise<StoreCredentialsResult>;
};
