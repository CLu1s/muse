const useGetKey = () => {
  const client = typeof window !== "undefined";
  const savedKey = client ? localStorage.getItem("apiKey") : null;
  const userName = client ? localStorage.getItem("userName") : undefined;

  return { savedKey, userName };
};

export default useGetKey;
