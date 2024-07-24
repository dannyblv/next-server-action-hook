import { useState, useTransition } from "react";

const useServerAction = (action: (...args: any[]) => Promise<any>) => {
  const [isLoading, startTransition] = useTransition();
  const [hasError, setHasError] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const clearError = () => setHasError(false);

  const run = (..._args: any[]) => new Promise<{ data?: any; } | void>((resolve) => {
    startTransition(async () => {
      try {
        clearError();
        
        const data = await action(..._args);
        resolve({ data });
        setData(data);
      } catch (error) {
        setHasError(true);
        setData(undefined);
        resolve();
      }
    });
  });

  return [run, {isLoading, hasError, data}, clearError] as const;
};

export default useServerAction;