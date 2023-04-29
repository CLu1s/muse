import React, { useEffect, useState } from "react";
import { fetch } from "@tauri-apps/api/http";
import {
  Modal as ChakraModal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image as ChakraImage,
  Grid,
  GridItem,
  Center,
  VStack,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Image, PurityColors } from "../../types";
import Actions from "./Actions";

type Props = {
  image: Image | null;
  removeImage: () => void;
  setWallpaper: (image: Image) => void;
  onSelectTag: (collection: number, page: number, term: string) => void;
  dispatch: React.Dispatch<any>;
};

type Tag = {
  id: number;
  name: string;
  purity: string;
};

type ImgData = {
  id: number;
  tags: Tag[];
};

const Modal = ({
  image,
  removeImage,
  setWallpaper,
  onSelectTag,
  dispatch,
}: Props) => {
  const [data, setData] = useState<ImgData | null>(null);
  useEffect(() => {
    if (!image) return;
    const fetchData = async () => {
      const url = `https://wallhaven.cc/api/v1/w/${image.id}?apikey=tLGG8XHnMqkxhW64JzK4NMJOCIt2BWb3`;
      const response = (await fetch(url, {
        method: "GET",
        timeout: 30,
      })) as any;
      const { data } = response;
      const newData = data.data as ImgData;
      setData(newData);
    };
    fetchData();
  }, [image]);

  if (!image) return null;
  const handleRemove = () => {
    removeImage();
  };
  const handleSearch = (search: string) => {
    dispatch({
      type: "SET_SEARCH_VALUE",
      payload: search,
    });
    onSelectTag(0, 1, search);
    handleRemove();
  };
  console.log(data);

  const ratio = image.dimension_y / image.dimension_x;

  const size = ratio > 1 ? "xl" : "full";

  return (
    <ChakraModal isOpen={Boolean(image)} onClose={handleRemove} size={size}>
      <ModalOverlay />
      <ModalContent bg="#22212c" color={"white"}>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody minH={"600px"}>
          <Grid templateColumns="1fr 4fr" gap={2}>
            <GridItem w="100%">
              <VStack w="full" spacing={4}>
                <Actions image={image} setWallpaper={setWallpaper} />
                <VStack w="full" alignItems="flex-start">
                  <Heading size="md">Tags</Heading>
                  <Wrap spacing={2}>
                    {data &&
                      data.tags.map((tag: Tag) => (
                        <WrapItem key={tag.id}>
                          <Button
                            size="xs"
                            color={
                              tag.purity === "nsfw"
                                ? PurityColors.nsfw
                                : tag.purity === "sketchy"
                                ? PurityColors.sketchy
                                : PurityColors.sfw
                            }
                            borderColor={"gray.700"}
                            onClick={() => handleSearch(`id:${tag.id}`)}
                          >
                            {tag.name}
                          </Button>
                        </WrapItem>
                      ))}
                  </Wrap>
                </VStack>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <Center>
                <ChakraImage
                  borderRadius="lg"
                  src={image.path}
                  alt="wallpaper"
                />
              </Center>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
