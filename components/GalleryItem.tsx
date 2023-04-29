import { useState } from "react";
import {
  Button,
  WrapItem,
  Image as ChakraImage,
  Fade,
  Box,
  Center,
  VStack,
} from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { Image, PurityColors } from "../types";
type Props = {
  image: Image;
  isActive: boolean;
  ratios: string[];
  setWallpaper: (image: Image) => void;
  setPreview: (image: Image) => void;
};

const PURITY_COLORS = {
  sfw: "none",
  sketchy: PurityColors.sketchy,
  nsfw: PurityColors.nsfw,
};

const GalleryItem = ({
  image,
  isActive,
  ratios,
  setWallpaper,
  setPreview,
}: Props) => {
  const [IsHover, setIsHover] = useState(false);
  const isClient = typeof window !== "undefined";
  const isPortrait = ratios.length === 1 && ratios.includes("portrait");
  const thumbnail = isPortrait ? image.thumbs.original : image.thumbs.small;
  const height = isPortrait ? "full" : "224px";
  return (
    <WrapItem
      key={image.id}
      position="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      border={
        isActive
          ? "2px solid white"
          : `2px solid ${
              PURITY_COLORS[image.purity as keyof typeof PURITY_COLORS]
            }`
      }
      borderRadius="md"
      width="340px"
      height={height}
    >
      <Fade in={IsHover}>
        <Box
          position="absolute"
          backgroundColor="rgba(0,0,0,0.5)"
          w="full"
          height="full"
        >
          <Center h="full">
            <VStack spacing={6}>
              <Button
                backgroundColor="#1282A2"
                color={"white"}
                minW="100px"
                _hover={{
                  backgroundColor: "#23BCE7",
                  color: "white",
                }}
                onClick={(e: any) => {
                  e.preventDefault();
                  isClient &&
                    invoke("open_url", { url: image.short_url }).catch(
                      console.error
                    );
                }}
                size="sm"
              >
                See on WH
              </Button>

              <Button
                backgroundColor="#00CC77"
                color={"white"}
                _hover={{
                  backgroundColor: "#52FFB8",
                  color: "white",
                }}
                minW="100px"
                onClick={() => {
                  setWallpaper(image);
                }}
                size="sm"
              >
                Set
              </Button>
              <Button
                minW="100px"
                onClick={() => setPreview(image)}
                size="sm"
                colorScheme="purple"
              >
                Preview
              </Button>
            </VStack>
          </Center>
        </Box>
      </Fade>
      <Box width="full">
        <ChakraImage
          fit={"cover"}
          width="full"
          src={thumbnail}
          fallbackSrc="/loading.png"
          alt="logo"
          borderRadius="md"
          w="full"
          height={height}
        />
      </Box>
    </WrapItem>
  );
};

export default GalleryItem;
