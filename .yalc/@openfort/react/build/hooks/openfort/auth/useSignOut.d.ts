import { OpenfortError, OpenfortHookOptions } from '../../../types';
/**
 * Hook for user sign out operations
 *
 * This hook manages user logout functionality, clearing authentication state
 * and disconnecting from all services. It provides a clean way to sign out users
 * while handling any cleanup operations and providing loading/error states.
 * The hook ensures complete logout by clearing all stored credentials and state.
 *
 * @param hookOptions - Optional configuration with callback functions
 * @returns Current sign out state and actions
 *
 * @example
 * ```tsx
 * const signOutHook = useSignOut({
 *   onSignOutSuccess: () => console.log('User signed out successfully'),
 *   onSignOutError: (error) => console.error('Sign out failed:', error),
 * });
 *
 * // Sign out user
 * const handleSignOut = async () => {
 *   try {
 *     await signOutHook.signOut();
 *     console.log('User has been signed out');
 *     // Redirect to login page or update UI
 *   } catch (error) {
 *     console.error('Sign out failed:', error);
 *   }
 * };
 *
 * // Sign out with custom options
 * const handleCustomSignOut = async () => {
 *   await signOutHook.signOut({
 *     onSuccess: () => console.log('Custom success handler'),
 *     onError: (error) => console.error('Custom error handler:', error),
 *   });
 * };
 *
 * // Check sign out state
 * if (signOutHook.isLoading) {
 *   console.log('Signing out...');
 * } else if (signOutHook.isError) {
 *   console.error('Sign out error:', signOutHook.error);
 * } else if (signOutHook.isSuccess) {
 *   console.log('Sign out successful');
 * }
 *
 * // Example usage in component
 * return (
 *   <button
 *     onClick={handleSignOut}
 *     disabled={signOutHook.isLoading}
 *   >
 *     {signOutHook.isLoading ? 'Signing out...' : 'Sign Out'}
 *   </button>
 * );
 * ```
 */
export declare function useSignOut(hookOptions?: OpenfortHookOptions): {
    signOut: (options?: OpenfortHookOptions) => Promise<{}>;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: OpenfortError | null | undefined;
};
