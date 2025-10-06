export declare enum OpenfortStatus {
    DISCONNECTED = 0,
    NEEDS_RECOVERY = 1,
    LOADING = 2,
    CONNECTED = 3
}
/**
 * Hook for monitoring Openfort connection and authentication status
 *
 * This hook provides real-time status information about the user's connection to Openfort
 * services and embedded wallet state. It tracks various states including loading, connected,
 * disconnected, and authentication status based on embedded wallet configuration and connection.
 *
 * @returns Current connection and authentication status flags
 *
 * @example
 * ```tsx
 * const status = useStatus();
 *
 * // Check connection states
 * if (status.isLoading) {
 *   console.log('Initializing Openfort connection...');
 * } else if (status.isConnecting) {
 *   console.log('Connecting to wallet...');
 * } else if (status.isConnected) {
 *   console.log('Successfully connected to Openfort');
 * } else if (status.isDisconnected) {
 *   console.log('Not connected to Openfort');
 * }
 *
 * // Check authentication state
 * if (status.isAuthenticated) {
 *   console.log('User is authenticated');
 *   // Show authenticated UI
 * } else {
 *   console.log('User is not authenticated');
 *   // Show login UI
 * }
 *
 * // Conditional rendering based on status
 * const renderContent = () => {
 *   if (status.isLoading) return <LoadingSpinner />;
 *   if (status.isConnecting) return <ConnectingIndicator />;
 *   if (status.isConnected && status.isAuthenticated) return <AuthenticatedApp />;
 *   return <LoginForm />;
 * };
 * ```
 */
export declare function useStatus(): {
    isLoading: boolean;
    isConnected: boolean;
    isDisconnected: boolean;
    isConnecting: boolean;
    isAuthenticated: boolean;
};
