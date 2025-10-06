import { AuthPlayerResponse } from '@openfort/openfort-js';
export type useConnectCallbackProps = {
    onConnect?: ({ address, connectorId, user, }: {
        address?: string;
        connectorId?: string;
        user?: AuthPlayerResponse;
    }) => void;
    onDisconnect?: () => void;
};
export declare const useConnectCallback: ({ onConnect, onDisconnect, }: useConnectCallbackProps) => void;
