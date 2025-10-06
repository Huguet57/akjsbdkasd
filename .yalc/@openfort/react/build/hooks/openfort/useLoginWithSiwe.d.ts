export type GenerateSiweNonceOptions = {
    address: string;
    ecosystemGame?: string;
};
export type LoginWithSiweOptions = {
    message: string;
    signature: string;
    connectorType?: string;
    walletClientType?: string;
};
export declare const useLoginWithSiwe: () => {
    generateSiweNonce: ({ address, ecosystemGame }: GenerateSiweNonceOptions) => Promise<string>;
    loginWithSiwe: ({ message, signature, connectorType, walletClientType, }: LoginWithSiweOptions) => Promise<import("@openfort/openfort-js").AuthPlayerResponse | null>;
};
