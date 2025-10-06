export declare function useConnectWithSiwe(): ({ onError, onConnect, }?: {
    onError?: (error: string, status?: number) => void;
    onConnect?: () => void;
}) => Promise<void>;
