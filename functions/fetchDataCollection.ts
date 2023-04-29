import addRatios from "./addRatios";
import convertCategories from "./convertCategories";
import convertPurity from "./convertPurity";
import { fetch } from "@tauri-apps/api/http";

interface FetchDataCollection {
  collection: number;
  page: number;
  purity: string[];
  categories: string[];
  ratios: string[];
  apiKey: string | null;
  userName?: string;
}

const fetchDataCollection = async ({
  collection,
  page,
  purity,
  categories,
  ratios,
  apiKey,
  userName,
}: FetchDataCollection) => {
  let key = apiKey;
  const baseUrl = "https://wallhaven.cc/api/v1";
  const apikey = `apikey=${key}&`;
  const params = `${
    key !== null ? apikey : ""
  }page=${page}&purity=${convertPurity(purity)}&categories=${convertCategories(
    categories
  )}&${addRatios(ratios)}`;
  const urls = {
    1: `search?sorting=toplist&${params}`,
    2: `search?sorting=hot&${params}`,
  };
  const url = urls[collection as keyof typeof urls]
    ? urls[collection as keyof typeof urls]
    : `collections/${userName}/${collection}?${params}`;
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "GET",
    timeout: 30,
  });

  const { data } = response;
  return data;
};

export default fetchDataCollection;
