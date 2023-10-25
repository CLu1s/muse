import addRatios from "./addRatios";
import convertCategories from "./convertCategories";
import convertPurity from "./convertPurity";
import { fetch } from "@tauri-apps/api/http";

interface SearchTermCall {
  page: number;
  purity: string[];
  categories: string[];
  ratios: string[];
  searchValue: string;
  apiKey: string | null;
}
const fetchDataSearch = async ({
  page,
  purity,
  categories,
  ratios,
  searchValue,
  apiKey,
}: SearchTermCall) => {
  try {
    const params = `page=${page}&purity=${convertPurity(
      purity,
    )}&categories=${convertCategories(categories)}&${addRatios(ratios)}`;
    const url = `https://wallhaven.cc/api/v1/search?q=${searchValue}&apikey=tLGG8XHnMqkxhW64JzK4NMJOCIt2BWb3&${params}`;
    const response = (await fetch(url, {
      method: "GET",
      timeout: 30,
    })) as any;
    const { data } = response;
    console.log(data, url);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default fetchDataSearch;
