import { useEffect, useState } from "react";

const useDebounce = (value: string, timeout: number = 500) => {
  const [state, setState] = useState(value);
  const [isDebounced, setIsDebounced] = useState(false);

  useEffect(() => {
    setIsDebounced(true);
    const handler = setTimeout(() => {
      setState(value);
      setIsDebounced(false);
    }, timeout);
    return () => clearTimeout(handler);
  }, [value, timeout, setIsDebounced]);

  return [state, isDebounced] as const;
};

export default useDebounce;
