import { useState, useTransition } from "react";

const useServerAction = (action: (...args: any[]) => Promise<any>) => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  const clearError = () => setError(undefined);

  const run = (..._args: any[]) => new Promise<{ data?: any; error?: any }>((resolve) => {
    startTransition(async () => {
      try {
        setError(undefined);
        const data = await action(..._args);
        resolve({ data });
        setData(data);
      } catch (error) {
        setError(error);
        setData(undefined);
        resolve({ error });
      }
    });
  });

  return [run, clearError, {loading, error, data}] as const;
};

export default useServerAction;