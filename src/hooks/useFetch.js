import { useCallback, useEffect, useState } from 'react';

export default function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetcher()
      .then((d) => active && setData(d))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [fetcher]);

  useEffect(() => load(), [load]);

  return { data, setData, loading, error, reload: load };
}
