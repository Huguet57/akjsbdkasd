import React from 'react';
import { SDKOverrides, ThirdPartyAuthConfiguration } from '@openfort/openfort-js';
import { useConnectCallbackProps } from '../../hooks/useConnectCallback';
import { ContextValue } from './context';
import { ConnectUIOptions, OpenfortWalletConfig } from './types';
type OpenfortProviderProps = {
    children?: React.ReactNode;
    debugMode?: boolean;
    publishableKey: string;
    uiConfig?: ConnectUIOptions;
    walletConfig?: OpenfortWalletConfig;
    overrides?: SDKOverrides;
    thirdPartyAuth?: ThirdPartyAuthConfiguration;
} & useConnectCallbackProps;
/**
 * Provides Openfort configuration and context to descendant components.
 *
 * The provider must be rendered within a {@link WagmiContext} and should only be mounted once
 * to avoid conflicting global state. See {@link OpenfortProviderProps} for the supported options.
 *
 * @param props - Provider configuration including callbacks, UI options and the wrapped children.
 * @returns A React element that sets up the Openfort context.
 * @throws If the component is rendered outside of a Wagmi provider or mounted multiple times.
 *
 * @example
 * ```tsx
 * import { WagmiConfig, createConfig } from 'wagmi';
 * import { OpenfortProvider } from '@openfort/openfort-react';
 *
 * const config = createConfig({ YOU_WAGMI_CONFIG_HERE });
 *
 * export function App() {
 *   return (
 *     <WagmiConfig config={config}>
 *       <OpenfortProvider publishableKey={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!}>
 *         <YourApp />
 *       </OpenfortProvider>
 *     </WagmiConfig>
 *   );
 * }
 * ```
 */
export declare const OpenfortProvider: ({ children, uiConfig, onConnect, onDisconnect, debugMode, publishableKey, walletConfig, overrides, thirdPartyAuth, }: OpenfortProviderProps) => React.FunctionComponentElement<React.ProviderProps<ContextValue | null>>;
export {};
