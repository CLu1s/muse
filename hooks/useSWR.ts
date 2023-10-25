import useSWRHook from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useSWR(url: string) {
  const { data, error, isLoading } = useSWRHook(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
