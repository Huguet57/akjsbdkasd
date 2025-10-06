import { AccountTypeEnum, RecoveryMethod, RecoveryParams } from "@openfort/openfort-js";
import { Hex } from "viem";
import { Connector } from "wagmi";
import { OpenfortError, OpenfortHookOptions } from "../../types";
export type UserWallet = {
    address: Hex;
    connectorType?: string;
    walletClientType?: string;
    connector?: Connector;
    id: string;
    isAvailable: boolean;
    isActive?: boolean;
    isConnecting?: boolean;
    recoveryMethod?: RecoveryMethod;
    accountId?: string;
    accountType?: AccountTypeEnum;
    ownerAddress?: Hex;
    implementationType?: string;
    createdAt?: number;
    salt?: string;
};
export type WalletRecovery = {
    recoveryMethod: RecoveryMethod;
    password?: string;
};
type SetActiveWalletResult = {
    error?: OpenfortError;
    wallet?: UserWallet;
};
type SetActiveWalletOptions = ({
    walletId: string;
    recovery?: WalletRecovery;
    address?: Hex | undefined;
    showUI?: boolean;
}) & OpenfortHookOptions<SetActiveWalletResult>;
type CreateWalletResult = SetActiveWalletResult;
type CreateWalletOptions = {
    recovery?: WalletRecovery;
    accountType?: AccountTypeEnum;
} & OpenfortHookOptions<CreateWalletResult>;
type RecoverEmbeddedWalletResult = SetActiveWalletResult;
type SetRecoveryOptions = {
    previousRecovery: RecoveryParams;
    newRecovery: RecoveryParams;
} & OpenfortHookOptions<CreateWalletResult>;
type WalletOptions = OpenfortHookOptions<SetActiveWalletResult | CreateWalletResult>;
/**
 * Hook for managing and interacting with user wallets
 *
 * This hook manages both embedded Openfort wallets and external wallets connected via Wagmi.
 * It handles wallet creation, recovery, connection, and switching between different wallet types.
 * The hook provides comprehensive wallet management functionality including creating embedded wallets,
 * recovering existing ones, and managing wallet connections across multiple providers.
 *
 * @param hookOptions - Optional configuration with callback functions and wallet options
 * @returns Current wallet state with management actions
 *
 * @example
 * ```tsx
 * const wallets = useWallets({
 *   onCreateWalletSuccess: (result) => console.log('Wallet created:', result.wallet),
 *   onCreateWalletError: (error) => console.error('Wallet creation failed:', error),
 *   onSetActiveWalletSuccess: (result) => console.log('Wallet activated:', result.wallet),
 * });
 *
 * // Check available wallets
 * if (wallets.hasWallet) {
 *   console.log('Available wallets:', wallets.wallets);
 *   console.log('Active wallet:', wallets.activeWallet);
 * }
 *
 * // Create a new embedded wallet with automatic recovery
 * await wallets.createWallet({
 *   recovery: { recoveryMethod: RecoveryMethod.AUTOMATIC },
 *   accountType: AccountTypeEnum.SMART_ACCOUNT,
 * });
 *
 * // Set active wallet by ID
 * await wallets.setActiveWallet('embedded-wallet-id');
 *
 * // Set active wallet with custom recovery
 * await wallets.setActiveWallet({
 *   walletId: 'embedded-wallet-id',
 *   recovery: { recoveryMethod: RecoveryMethod.PASSWORD, password: 'user-password' },
 *   showUI: true,
 * });
 *
 * // Set recovery method for existing wallet
 * await wallets.setRecovery({
 *   previousRecovery: { recoveryMethod: RecoveryMethod.AUTOMATIC },
 *   newRecovery: { recoveryMethod: RecoveryMethod.PASSWORD, password: 'new-password' },
 * });
 *
 * // Export private key from embedded wallet (requires authentication)
 * try {
 *   const privateKey = await wallets.exportPrivateKey();
 *   console.log('Private key exported:', privateKey);
 * } catch (error) {
 *   console.error('Failed to export private key:', error);
 * }
 * ```
 */
export declare function useWallets(hookOptions?: WalletOptions): {
    exportPrivateKey: () => Promise<string>;
    error: OpenfortError | null | undefined;
    isError: boolean;
    isSuccess: boolean;
    isCreating: boolean;
    isConnecting: boolean;
    hasWallet: boolean;
    isLoadingWallets: boolean;
    wallets: UserWallet[];
    availableWallets: import("../../wallets/useWallets").WalletProps[];
    activeWallet: UserWallet | undefined;
    setRecovery: (params: SetRecoveryOptions) => Promise<RecoverEmbeddedWalletResult>;
    reset: () => void;
    createWallet: ({ recovery, ...options }?: CreateWalletOptions) => Promise<CreateWalletResult>;
    setActiveWallet: (options: SetActiveWalletOptions | string) => Promise<SetActiveWalletResult>;
};
export {};
