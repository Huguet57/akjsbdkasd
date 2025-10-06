import { Connector } from "wagmi";
import { OpenfortHookOptions, OpenfortError } from "../../../types";
type ConnectWalletOptions = {
    connector: Connector | string;
};
export declare const useWalletAuth: (hookOptions?: OpenfortHookOptions) => {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: OpenfortError | null | undefined;
    walletConnectingTo: string | null;
    connectWallet: (options: ConnectWalletOptions) => Promise<{
        error: OpenfortError;
    } | undefined>;
    linkWallet: (options: ConnectWalletOptions) => Promise<{
        error: OpenfortError;
    } | undefined>;
    availableWallets: import("../../../wallets/useWallets").WalletProps[];
};
export {};
