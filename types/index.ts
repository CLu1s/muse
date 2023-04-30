export interface Image {
  id: string;
  url: string;
  path: string;
  short_url: string;
  dimension_x: number;
  dimension_y: number;
  colors: string[];
  purity: string;
  thumbs: {
    small: string;
    original: string;
    large: string;
  };
}

export interface Metadata {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Settings {
  thumb_size: string;
  per_page: string;
  purity: string[];
  categories: string[];
  ai_art_filter: number;
  resolutions: string[];
  aspect_ratios: string[];
  toplist_range: string;
  tag_blacklist: string[];
  user_blacklist: string[];
}

export interface State {
  images: Image[];
  metadata: Metadata;
  currentCollection: number;
  searchValue: string;
  collections: Array<any>;
  currentWallpaper: Image | null;
  previewWallpaper: Image | null;
  purity: string[];
  categories: string[];
  ratios: string[];
  isLoading: boolean;
  currentIndex: number;
  isSlideActive: boolean;
  intervalID: number | null;
  settings: Settings | null;
  apiKey: string;
  userName: string;
}

export enum PurityColors {
  sfw = "#2CB57C",
  sketchy = "#D7A409",
  nsfw = "#A5402D",
}
