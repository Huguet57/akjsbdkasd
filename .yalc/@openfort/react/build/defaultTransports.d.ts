/**
 * Helpers for constructing default Wagmi transports for supported chains.
 *
 * These utilities favour convenience over granular control, making them suitable for
 * straightforward integrations where automatically configuring transports is preferable to
 * repeating boilerplate in every application.
 */
import { type CreateConfigParameters } from '@wagmi/core';
/**
 * Options for {@link getDefaultTransports}.
 */
type GetDefaultTransportsProps = {
    chains?: CreateConfigParameters['chains'];
    alchemyId?: string;
    infuraId?: string;
};
/**
 * Creates a map of Wagmi transports for the provided chains.
 *
 * @param props - Configuration for the generated transports.
 * @param props.chains - Chains that require transports. Defaults to popular EVM chains.
 * @param props.alchemyId - Alchemy API key used to prioritise Alchemy transports when available.
 * @param props.infuraId - Infura API key used to prioritise Infura transports when available.
 * @returns A record mapping chain identifiers to their fallback transport configuration.
 *
 * @example
 * ```ts
 * import { createConfig } from 'wagmi';
 * import { getDefaultTransports } from '@openfort/openfort-react';
 *
 * const config = createConfig({
 *   chains: [mainnet],
 *   transports: getDefaultTransports({ alchemyId: process.env.ALCHEMY_ID ?? '' }),
 * });
 * ```
 */
export declare const getDefaultTransports: ({ chains, alchemyId, infuraId, }: GetDefaultTransportsProps) => CreateConfigParameters["transports"];
export {};
