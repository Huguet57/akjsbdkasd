import React from 'react';
import { Chain } from 'viem';
import { CustomTheme, Mode, Theme } from '../../types';
type Hash = `0x${string}`;
type ConnectButtonRendererProps = {
    children?: (renderProps: {
        show?: () => void;
        hide?: () => void;
        chain?: Chain & {
            unsupported?: boolean;
        };
        unsupported: boolean;
        isConnected: boolean;
        isConnecting: boolean;
        address?: Hash;
        truncatedAddress?: string;
        ensName?: string;
    }) => React.ReactNode;
};
type OpenfortButtonProps = {
    label?: string;
    showBalance?: boolean;
    showAvatar?: boolean;
    theme?: Theme;
    mode?: Mode;
    customTheme?: CustomTheme;
    onClick?: (open: () => void) => void;
};
export declare function OpenfortButton({ label, showBalance, showAvatar, theme, mode, customTheme, onClick, }: OpenfortButtonProps): import("react/jsx-runtime").JSX.Element | null;
export declare namespace OpenfortButton {
    var Custom: React.FC<ConnectButtonRendererProps>;
}
export {};
