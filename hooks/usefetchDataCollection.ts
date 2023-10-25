import addRatios from "../functions/addRatios";
import convertCategories from "../functions/convertCategories";
import convertPurity from "../functions/convertPurity";
import useSWR from "./useSWR";
interface UsefetchDataCollection {
  collection: number;
  page: number;
  purity: string[];
  categories: string[];
  ratios: string[];
  apiKey: string | null;
  userName?: string;
}

const useFetchDataCollection = async ({
  collection,
  page,
  purity,
  categories,
  ratios,
  apiKey,
  userName,
}: UsefetchDataCollection) => {
  let key = apiKey;
  const baseUrl = "https://wallhaven.cc/api/v1";
  const apikey = `apikey=${key}&`;
  const params = `${
    key !== null ? apikey : ""
  }page=${page}&purity=${convertPurity(purity)}&categories=${convertCategories(
    categories,
  )}&${addRatios(ratios)}`;

  const urls = {
    1: `search?sorting=toplist&${params}`,
    2: `search?sorting=hot&${params}`,
    3: `search?sorting=date_added&order=desc&${params}`,
  };
  const url = urls[collection as keyof typeof urls]
    ? urls[collection as keyof typeof urls]
    : `collections/${userName}/${collection}?${params}`;
  const response = useSWR(`${baseUrl}/${url}`);

  const { data } = response;
  return data;
};

export default useFetchDataCollection;
