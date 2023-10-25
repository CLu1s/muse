export const getCredentials = () => {
  const client = typeof window !== "undefined";
  const savedKey = client ? (localStorage.getItem("apiKey") as string) : "";
  const userName = client ? (localStorage.getItem("userName") as string) : "";

  return { savedKey, userName };
};
