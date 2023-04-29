import { fetch } from "@tauri-apps/api/http";

const fetchCollections = async (apiKey: string) => {
  let key = apiKey;

  try {
    const response = await fetch(
      `https://wallhaven.cc/api/v1/collections?apikey=${key}`,
      {
        method: "GET",
        timeout: 30,
      }
    );
    const { data } = response as any;
    const payload = data.data as unknown as any;
    return payload ? payload : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default fetchCollections;
