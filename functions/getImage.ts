import { Image } from "../types";
import { invoke } from "@tauri-apps/api/tauri";

const getImage = async (image: Image) => {
  console.log("getImage", image);
  const isClient = typeof window !== "undefined";

  isClient &&
    (await invoke("set_wallpaper", { url: image.path }).catch(console.error));

  return image;
};

export default getImage;
