import { OpenfortHookOptions, OpenfortError } from "../../types";
export declare const onSuccess: <T>({ hookOptions, options, data, }: {
    hookOptions?: OpenfortHookOptions<T>;
    options?: OpenfortHookOptions<T>;
    data: T;
}) => T;
export declare const onError: <T>({ hookOptions, options, error, }: {
    hookOptions?: OpenfortHookOptions<T>;
    options?: OpenfortHookOptions<T>;
    error: OpenfortError;
}) => {
    error: OpenfortError;
};
