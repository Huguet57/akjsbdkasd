type LoaderProps = {
    header: string;
    description?: string | undefined;
    isLoading?: boolean;
    icon?: React.ReactNode;
    isError?: boolean;
    isSuccess?: boolean;
    onRetry?: () => void;
};
declare const Loader: ({ header, description, icon, isError, isSuccess, isLoading, onRetry, }: LoaderProps) => import("react/jsx-runtime").JSX.Element;
export default Loader;
