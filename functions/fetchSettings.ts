import { fetch } from "@tauri-apps/api/http";

const fetchSettings = async (key: string | null) => {
  try {
    const response = (await fetch(
      `https://wallhaven.cc/api/v1/settings?apikey=${key}`,
      {
        method: "GET",
        timeout: 30,
      }
    )) as any;
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default fetchSettings;
