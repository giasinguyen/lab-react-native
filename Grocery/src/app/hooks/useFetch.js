import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        if (isMounted) setData(json);
      } catch (e) {
        if (isMounted) setError(e);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [url]);
  return [data, loading, error];
}
