import { useState } from "react";
import { Spinner, Center, Heading, VStack, SimpleGrid } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import GalleryItem from "./GalleryItem";
import { Image, State } from "../types";

type Props = {
  state: State;
  dispatch: (action: any) => void;
  getCollection: (id: number, page: number, searchValue?: string) => void;
  setWallpaper: (image: Image) => void;
};

const Gallery = ({ state, dispatch, getCollection, setWallpaper }: Props) => {
  const [oldIndex, setOldIndex] = useState(0);
  const {
    images,
    metadata,
    currentCollection,
    currentWallpaper,
    isLoading,
    currentIndex,
    isSlideActive,
    searchValue,
  } = state;

  const setPreview = (image: Image) => {
    dispatch({
      type: "SET_PREVIEW_WALLPAPER",
      payload: image,
    });
  };
  if (isSlideActive && currentIndex !== oldIndex) {
    setWallpaper(images[currentIndex]);
    setOldIndex(currentIndex);
  }

  const loadFunc = () => {
    if (isLoading) return;
    if (currentCollection || searchValue) {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      getCollection(currentCollection, metadata.current_page + 1, searchValue);
    }
  };

  const renderImages =
    images.length > 0 &&
    images.map((image: Image, index: number) => (
      <GalleryItem
        key={image.id}
        image={image}
        ratios={state.ratios}
        setWallpaper={(image) => {
          dispatch({
            type: "SET_CURRENT_INDEX",
            payload: index,
          });
          setWallpaper(image);
        }}
        setPreview={setPreview}
        isActive={image.id === currentWallpaper?.id}
      />
    ));

  return (
    <VStack
      spacing={2}
      justifyItems="center"
      style={{
        height: "90vh",
        overflowY: "auto",
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={metadata.current_page < metadata.last_page}
        useWindow={false}
        loader={
          <Center height="200px" key={0}>
            <Spinner size="xl" color="teal.100" emptyColor="#E7E6F0" />
          </Center>
        }
      >
        <SimpleGrid w="full" columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {images.length > 0 && renderImages}
        </SimpleGrid>
        {images.length === 0 && !metadata.total && (
          <Center height="200px" key={0}>
            <Heading size="md" color="gray.500">
              Select a collection to start
            </Heading>
          </Center>
        )}
      </InfiniteScroll>
    </VStack>
  );
};

export default Gallery;
