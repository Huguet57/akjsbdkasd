import { OpenfortError } from "../../../types";
export type BaseFlowState = {
    status: "idle" | 'awaiting-input' | 'loading' | 'success';
    error?: never;
} | {
    status: 'error';
    error: OpenfortError | null;
};
export declare const mapStatus: (status: BaseFlowState) => {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: OpenfortError | null | undefined;
};
