import { useEffect, useState } from 'react';

type Data<T> = T | null;
type ErrorOrNull = unknown | null;

interface Props<T> {
  data: Data<T>;
  isLoading: boolean;
  hasError: ErrorOrNull;
}

export const useFetch = <T>(url: string): Props<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState<ErrorOrNull>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setHasError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const jsonData: T = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Petición cancelada');
          return;
        }

        setHasError(err);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, hasError };
};
