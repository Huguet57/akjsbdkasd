import { type AuthPlayerResponse as OpenfortUser } from '@openfort/openfort-js';
import { OpenfortHookOptions, OpenfortError } from "../../../types";
import { CreateWalletPostAuthOptions } from './useConnectToWalletPostAuth';
import { UserWallet } from '../useWallets';
export type EmailAuthResult = {
    error?: OpenfortError;
    user?: OpenfortUser;
    wallet?: UserWallet;
    requiresEmailVerification?: boolean;
};
export type SignInEmailOptions = {
    email: string;
    password: string;
    emailVerificationRedirectTo?: string;
} & OpenfortHookOptions<EmailAuthResult> & CreateWalletPostAuthOptions;
export type SignUpEmailOptions = {
    email: string;
    password: string;
    name?: string;
    emailVerificationRedirectTo?: string;
} & OpenfortHookOptions<EmailAuthResult> & CreateWalletPostAuthOptions;
export type RequestResetPasswordOptions = {
    email: string;
    emailVerificationRedirectTo?: string;
} & OpenfortHookOptions<EmailAuthResult>;
export type ResetPasswordOptions = {
    email: string;
    password: string;
    state: string;
} & OpenfortHookOptions<EmailAuthResult>;
export type LinkEmailOptions = {
    email: string;
    password: string;
    emailVerificationRedirectTo?: string;
} & OpenfortHookOptions<EmailAuthResult>;
export type VerifyEmailOptions = {
    email: string;
    state: string;
} & OpenfortHookOptions<EmailVerificationResult>;
export type EmailVerificationResult = {
    email?: string;
    error?: OpenfortError;
};
export type UseEmailHookOptions = {
    emailVerificationRedirectTo?: string;
} & OpenfortHookOptions<EmailAuthResult | EmailVerificationResult> & CreateWalletPostAuthOptions;
/**
 * Hook for email-based authentication operations
 *
 * This hook manages email authentication flows including sign-in, sign-up, password reset,
 * email verification, and email linking. It handles both password and passwordless authentication
 * and automatically manages wallet connection after successful authentication.
 *
 * @param hookOptions - Optional configuration with callback functions and authentication options
 * @returns Current authentication state with email auth actions
 *
 * @example
 * ```tsx
 * const emailAuth = useEmailAuth({
 *   onSignInEmailSuccess: (result) => console.log('Signed in:', result.user),
 *   onSignInEmailError: (error) => console.error('Sign-in failed:', error),
 *   emailVerificationRedirectTo: 'https://yourapp.com/verify',
 *   recoverWalletAutomatically: true,
 * });
 *
 * // Sign up with email and password
 * await emailAuth.signUpEmail({
 *   email: 'user@example.com',
 *   password: 'securePassword123',
 *   name: 'John Doe',
 * });
 *
 * // Sign in with email and password
 * await emailAuth.signInEmail({
 *   email: 'user@example.com',
 *   password: 'securePassword123',
 * });
 *
 * // Request password reset
 * await emailAuth.requestResetPassword({
 *   email: 'user@example.com',
 * });
 *
 * // Reset password with state token
 * await emailAuth.resetPassword({
 *   email: 'user@example.com',
 *   password: 'newPassword123',
 *   state: 'reset-token-from-email',
 * });
 *
 * // Verify email with state token
 * await emailAuth.verifyEmail({
 *   email: 'user@example.com',
 *   state: 'verification-token-from-email',
 * });
 *
 * // Link email to existing authenticated account
 * await emailAuth.linkEmail({
 *   email: 'secondary@example.com',
 *   password: 'password123',
 * });
 *
 * // Check authentication state
 * if (emailAuth.isLoading) {
 *   console.log('Processing authentication...');
 * } else if (emailAuth.isError) {
 *   console.error('Authentication error:', emailAuth.error);
 * } else if (emailAuth.isSuccess) {
 *   console.log('Authentication successful');
 * }
 *
 * // Handle email verification requirement
 * if (emailAuth.requiresEmailVerification) {
 *   console.log('Please check your email to verify your account');
 * }
 * ```
 */
export declare const useEmailAuth: (hookOptions?: UseEmailHookOptions) => {
    requiresEmailVerification: boolean;
    isAwaitingInput: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: OpenfortError | null | undefined;
    signInEmail: (options: SignInEmailOptions) => Promise<EmailAuthResult>;
    signUpEmail: (options: SignUpEmailOptions) => Promise<EmailAuthResult>;
    verifyEmail: (options: VerifyEmailOptions) => Promise<EmailVerificationResult>;
    linkEmail: (options: LinkEmailOptions) => Promise<EmailAuthResult>;
    requestResetPassword: (options: RequestResetPasswordOptions) => Promise<EmailAuthResult>;
    resetPassword: (options: ResetPasswordOptions) => Promise<EmailAuthResult>;
    reset: () => void;
};
