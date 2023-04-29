import { Button, VStack } from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { Image } from "../../types";
const isClient = typeof window !== "undefined";

type Props = {
  image: Image;
  setWallpaper: (image: Image) => void;
};

const Actions = ({ image, setWallpaper }: Props) => {
  return (
    <VStack w="full">
      <Button
        backgroundColor="#00CC77"
        color={"white"}
        _hover={{
          backgroundColor: "#52FFB8",
          color: "white",
        }}
        width={"100%"}
        onClick={() => {
          setWallpaper(image);
        }}
      >
        Set
      </Button>
      <Button
        backgroundColor="#1282A2"
        color={"white"}
        _hover={{
          backgroundColor: "#23BCE7",
          color: "white",
        }}
        width={"100%"}
        onClick={(e) => {
          e.preventDefault();
          isClient &&
            invoke("open_url", { url: image.short_url }).catch(console.error);
        }}
      >
        See on Wallhaven
      </Button>
    </VStack>
  );
};

export default Actions;
