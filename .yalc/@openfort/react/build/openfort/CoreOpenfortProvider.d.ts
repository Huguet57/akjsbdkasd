import { AuthPlayerResponse, EmbeddedAccount, EmbeddedState, Openfort } from '@openfort/openfort-js';
import React, { PropsWithChildren } from 'react';
import { useConnectCallbackProps } from '../hooks/useConnectCallback';
export type ContextValue = {
    signUpGuest: () => Promise<void>;
    embeddedState: EmbeddedState;
    isLoading: boolean;
    needsRecovery: boolean;
    user: AuthPlayerResponse | null;
    updateUser: (user?: AuthPlayerResponse) => Promise<AuthPlayerResponse | null>;
    embeddedAccounts?: EmbeddedAccount[];
    isLoadingAccounts: boolean;
    logout: () => void;
    client: Openfort;
};
export type CoreOpenfortProviderProps = {
    debugMode?: boolean;
} & ConstructorParameters<typeof Openfort>[0] & useConnectCallbackProps;
export declare const CoreOpenfortProvider: React.FC<PropsWithChildren<CoreOpenfortProviderProps>>;
