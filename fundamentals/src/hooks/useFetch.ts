import { useEffect, useState } from 'react';

type Data<T> = T | null;
type ErrorOrNull = Error | null;

interface Props<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorOrNull;
}

export const useFetch = <T>(url: string): Props<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorOrNull>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const jsonData: T = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err as ErrorOrNull);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
