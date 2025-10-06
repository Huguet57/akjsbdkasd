/**
 * Custom wrapper around {@link wagmiUseConnect} that adds Openfort specific logic.
 *
 * @param props - Optional configuration passed through to Wagmi's hook.
 * @returns Connection helpers augmented with Openfort defaults and logging.
 *
 * @example
 * ```ts
 * const { connect, connectors } = useConnect();
 * await connect({ connector: connectors[0] });
 * ```
 */
import { Connector, CreateConnectorFn, type UseConnectParameters } from 'wagmi';
export declare function useConnect({ ...props }?: UseConnectParameters): {
    data: undefined;
    variables: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isPending: false;
    isSuccess: false;
    status: "idle";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: import("@wagmi/core").ConnectErrorType | null;
    isPaused: boolean;
    submittedAt: number;
    connect: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => void;
    connectAsync: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => Promise<import("wagmi/query").ConnectData<import("wagmi").Config>>;
    connectors: readonly Connector<CreateConnectorFn>[];
} | {
    data: undefined;
    variables: import("wagmi/query").ConnectVariables<import("wagmi").Config, Connector<CreateConnectorFn>>;
    error: null;
    isError: false;
    isIdle: false;
    isPending: true;
    isSuccess: false;
    status: "pending";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: import("@wagmi/core").ConnectErrorType | null;
    isPaused: boolean;
    submittedAt: number;
    connect: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => void;
    connectAsync: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => Promise<import("wagmi/query").ConnectData<import("wagmi").Config>>;
    connectors: readonly Connector<CreateConnectorFn>[];
} | {
    data: undefined;
    variables: import("wagmi/query").ConnectVariables<import("wagmi").Config, Connector<CreateConnectorFn>>;
    error: import("@wagmi/core").ConnectErrorType;
    isError: true;
    isIdle: false;
    isPending: false;
    isSuccess: false;
    status: "error";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: import("@wagmi/core").ConnectErrorType | null;
    isPaused: boolean;
    submittedAt: number;
    connect: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => void;
    connectAsync: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => Promise<import("wagmi/query").ConnectData<import("wagmi").Config>>;
    connectors: readonly Connector<CreateConnectorFn>[];
} | {
    data: import("wagmi/query").ConnectData<import("wagmi").Config>;
    variables: import("wagmi/query").ConnectVariables<import("wagmi").Config, Connector<CreateConnectorFn>>;
    error: null;
    isError: false;
    isIdle: false;
    isPending: false;
    isSuccess: true;
    status: "success";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: import("@wagmi/core").ConnectErrorType | null;
    isPaused: boolean;
    submittedAt: number;
    connect: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => void;
    connectAsync: ({ connector, chainId, mutation, }: {
        connector: CreateConnectorFn | Connector;
        chainId?: number;
        mutation?: UseConnectParameters["mutation"];
    }) => Promise<import("wagmi/query").ConnectData<import("wagmi").Config>>;
    connectors: readonly Connector<CreateConnectorFn>[];
};
