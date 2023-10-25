import { State } from "./types";
import { getCredentials } from "@/functions";

const convertPurity = (purity: string[]) => {
  const sfw = purity.includes("sfw") ? "1" : "0";
  const sketchy = purity.includes("sketchy") ? "1" : "0";
  const nsfw = purity.includes("nsfw") ? "1" : "0";

  return `${sfw}${sketchy}${nsfw}`;
};

const convertCategories = (categories: string[]) => {
  const general = categories.includes("general") ? "1" : "0";
  const anime = categories.includes("anime") ? "1" : "0";
  const people = categories.includes("people") ? "1" : "0";

  return `${general}${anime}${people}`;
};

const addRatios = (ratios: string[]) => {
  return `ratios=${ratios.join("%2C")}`;
};

export const init: State = {
  images: [],
  metadata: {
    total: 0,
    current_page: 0,
    last_page: 0,
    per_page: 0,
  },
  currentCollection: 0,
  searchValue: "",
  collections: [],
  currentWallpaper: null,
  previewWallpaper: null,
  purity: ["sfw"],
  categories: ["general"],
  ratios: [],
  isLoading: false,
  currentIndex: 0,
  isSlideActive: false,
  intervalID: null,
  settings: null,
  apiKey: getCredentials().savedKey,
  userName: getCredentials().userName,
};
export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        images: [...state.images, ...action.payload.data],
        metadata: action.payload.meta,
        isLoading: false,
      };
    case "SET_COLLECTIONS":
      return {
        ...state,
        isLoading: true,
        collections: action.payload,
      };
    case "SET_CURRENT_COLLECTION":
      state.intervalID && clearInterval(state.intervalID);
      return {
        ...state,
        images: [],
        isLoading: true,
        isSlideActive: false,
        currentIndex: 0,
        intervalID: null,
        currentCollection: action.payload,
        searchValue: "",
      };
    case "SET_CURRENT_WALLPAPER":
      const index = state.images.findIndex(
        (item) => item.id === action.payload.id,
      );

      return {
        ...state,
        currentWallpaper: action.payload,
        currentIndex: index,
      };
    case "SET_PREVIEW_WALLPAPER":
      return {
        ...state,
        previewWallpaper: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_PURITY":
      state.intervalID && clearInterval(state.intervalID);
      return {
        ...state,
        images: [],
        isSlideActive: false,
        currentIndex: 0,
        intervalID: null,
        metadata: {
          ...state.metadata,
          current_page: 0,
        },
        purity: action.payload,
      };
    case "SET_CATEGORIES":
      state.intervalID && clearInterval(state.intervalID);
      return {
        ...state,
        images: [],
        isSlideActive: false,
        currentIndex: 0,
        intervalID: null,
        metadata: {
          ...state.metadata,
          current_page: 0,
        },
        categories: action.payload,
      };
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        currentIndex: Number(action.payload),
      };
    case "ADVANCE_CURRENT_INDEX":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    case "SET_SLIDE_ACTIVE":
      return {
        ...state,
        isSlideActive: action.payload.isActivated,
        intervalID: action.payload.intervalID,
      };
    case "SET_SETTINGS":
      const settings = action.payload as State["settings"];
      const { ai_art_filter } = settings!;
      const includeAI = ai_art_filter === 0 ? "AI_ART" : "";
      return {
        ...state,
        settings,
        purity: settings?.purity ?? ["sfw"],
        categories: settings
          ? [...settings.categories, includeAI]
          : ["general"],
      };
    case "SET_RATIOS":
      state.intervalID && clearInterval(state.intervalID);
      return {
        ...state,
        images: [],
        isSlideActive: false,
        currentIndex: 0,
        metadata: {
          ...state.metadata,
          current_page: 0,
        },
        intervalID: null,
        ratios: action.payload,
      };
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
        isSlideActive: false,
        currentCollection: 0,
        images: [],
        isLoading: false,
      };
    case "SET_API_KEY":
      return {
        ...state,
        apiKey: action.payload,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_RANDOM":
      const fetchData = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      };
      const page = Math.floor(Math.random() * state.metadata.last_page);
      const image = Math.floor(Math.random() * state.metadata.per_page);
      const {
        purity,
        categories,
        ratios,
        currentCollection: collection,
      } = state;
      const params = `page=${page}&purity=${convertPurity(
        purity,
      )}&categories=${convertCategories(categories)}&${addRatios(ratios)}`;

      console.log("_getCollection", collection, page);

      const urls = {
        1: `/api/top?${params}`,
        2: `/api/hot?${params}`,
      };
      const url = urls[collection as keyof typeof urls]
        ? urls[collection as keyof typeof urls]
        : `/api/collection/${collection}?${params}`;

      const data = fetchData(url).then((response) => {
        console.log("response", response);
        console.log("set random", { page, image: response.data[image] });
        return response;
      });

      return {
        ...state,
      };
    default:
      return state;
  }
};
