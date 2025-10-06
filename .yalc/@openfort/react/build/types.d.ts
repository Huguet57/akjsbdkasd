import { Languages as Lang } from './localizations';
export type Languages = Lang;
export type Theme = 'auto' | 'web95' | 'retro' | 'soft' | 'midnight' | 'minimal' | 'rounded' | 'nouns';
export type Mode = 'light' | 'dark' | 'auto';
export type CustomTheme = any;
export type All = {
    theme?: Theme;
    mode?: Mode;
    customTheme?: CustomTheme;
    lang?: Languages;
};
export type { ConnectUIOptions as OpenfortOptions, OpenfortWalletConfig } from './components/Openfort/types';
export type { CustomAvatarProps } from './components/Common/Avatar';
export declare enum OpenfortErrorType {
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
    WALLET_ERROR = "WALLET_ERROR",
    CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR"
}
interface Data {
    [key: string]: any;
}
export declare class OpenfortError extends Error {
    type: OpenfortErrorType;
    data: Data;
    constructor(message: string, type: OpenfortErrorType, data?: Data);
}
export type OpenfortHookOptions<T = {
    error?: OpenfortError;
}> = {
    onSuccess?: (data: T) => void;
    onError?: (error: OpenfortError) => void;
    onSettled?: (data: T | undefined | null, error: OpenfortError | null) => void;
    throwOnError?: boolean;
};
export { SDKOverrides, RecoveryMethod, ThirdPartyOAuthProvider, OAuthProvider, } from '@openfort/openfort-js';
