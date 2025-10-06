/**
 * Hook for controlling Openfort UI modal and navigation
 *
 * This hook provides programmatic control over the Openfort UI modal, including opening,
 * closing, and navigating between different screens. It handles route validation and
 * automatically selects appropriate screens based on user connection and authentication state.
 * The hook ensures safe navigation by validating routes against user's current state.
 *
 * @returns UI control functions and modal state
 *
 * @example
 * ```tsx
 * const ui = useUI();
 *
 * // Check if modal is open
 * if (ui.isOpen) {
 *   console.log('Openfort modal is currently open');
 * }
 *
 * // Open modal with default route (auto-determined by user state)
 * const handleConnect = () => {
 *   ui.open(); // Opens providers screen if not connected, profile if connected
 * };
 *
 * // Close modal
 * const handleClose = () => {
 *   ui.close();
 * };
 *
 * // Programmatically control modal state
 * const toggleModal = () => {
 *   ui.setIsOpen(!ui.isOpen);
 * };
 *
 * // Open specific screens
 * const handleProfileClick = () => {
 *   ui.openProfile(); // Opens user profile screen (connected users only)
 * };
 *
 * const handleProvidersClick = () => {
 *   ui.openProviders(); // Opens authentication providers screen
 * };
 *
 * const handleWalletsClick = () => {
 *   ui.openWallets(); // Opens wallet connectors screen
 * };
 *
 * const handleNetworkClick = () => {
 *   ui.openSwitchNetworks(); // Opens network switching screen (connected users only)
 * };
 *
 * // Example usage in component
 * return (
 *   <div>
 *     <button onClick={handleConnect}>
 *       {ui.isOpen ? 'Close' : 'Open'} Openfort
 *     </button>
 *     <button onClick={handleProfileClick}>Profile</button>
 *     <button onClick={handleWalletsClick}>Wallets</button>
 *   </div>
 * );
 * ```
 */
export declare function useUI(): {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    setIsOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    openProfile: () => void;
    openSwitchNetworks: () => void;
    openProviders: () => void;
    openWallets: () => void;
};
