import { Openfort as OpenfortClient, OpenfortSDKConfiguration } from '@openfort/openfort-js';
/**
 * Creates a new {@link OpenfortClient} instance.
 *
 * @param config - Configuration options passed directly to the Openfort SDK constructor.
 * @returns A configured Openfort client instance.
 *
 * @example
 * ```ts
 * const client = createOpenfortClient({
 *   baseConfiguration: { publishableKey: 'pk_test_123' },
 * });
 *
 * const token = await client.getAccessToken();
 * ```
 */
export declare function createOpenfortClient(config: OpenfortSDKConfiguration): OpenfortClient;
/**
 * Gets or initialises the shared {@link OpenfortClient} instance.
 *
 * @param options - Optional configuration used when initialising the client for the first time.
 * @returns The shared Openfort client instance.
 * @throws If the default client has not been set and no configuration options are provided.
 *
 * @example
 * ```ts
 * setDefaultClient(createOpenfortClient({ baseConfiguration: { publishableKey: 'pk' } }));
 * const client = getDefaultClient();
 * ```
 */
export declare function getDefaultClient(options?: OpenfortSDKConfiguration): OpenfortClient;
/**
 * Sets the shared {@link OpenfortClient} instance.
 *
 * @param client - Pre-configured Openfort client to store as the default.
 *
 * @example
 * ```ts
 * const client = createOpenfortClient({ baseConfiguration: { publishableKey: 'pk' } });
 * setDefaultClient(client);
 * ```
 */
export declare function setDefaultClient(client: OpenfortClient): void;
