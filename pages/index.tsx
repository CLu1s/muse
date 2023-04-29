import { useReducer, useEffect } from "react";
import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import { throttle } from "radash";
import Gallery from "../components/Gallery";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { reducer, init } from "../reducer";
import { State, Image } from "../types";
import TopBar from "../components/TopBar";
import {
  getImage,
  fetchDataCollection,
  fetchDataSearch,
  fetchSettings,
} from "../functions";
import useGetKey from "@/hooks/useGetKey";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, init);
  const { purity, categories, ratios } = state as State;
  const { savedKey: key, userName } = useGetKey();

  useEffect(() => {
    if (!key) return;
    dispatch({
      type: "SET_API_KEY",
      payload: key,
    });
    dispatch({
      type: "SET_USER_NAME",
      payload: userName,
    });
  }, [key]);

  const searchTermCall = async (searchValue: string, page: number) => {
    const data = await fetchDataSearch({
      searchValue,
      page,
      purity,
      categories,
      ratios,
      apiKey: key,
    });
    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const _getCollection = async (
    collection: number,
    page: number,
    searchTerm?: string
  ) => {
    if (searchTerm) {
      await searchTermCall(searchTerm, page);
      return;
    }

    const data = await fetchDataCollection({
      collection,
      page,
      purity,
      categories,
      ratios,
      apiKey: key,
      userName: userName ?? "",
    });

    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const getSettings = async () => {
    try {
      const data = await fetchSettings(key);
      dispatch({
        type: "SET_SETTINGS",
        payload: data.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSettings();
  }, []);

  const getCollection = throttle({ interval: 500 }, _getCollection);

  const _setWallpaper = async (image: Image) => {
    await getImage(image);
    dispatch({
      type: "SET_CURRENT_WALLPAPER",
      payload: image,
    });
  };

  const setWallpaper = throttle({ interval: 1000 }, _setWallpaper);
  const removePreview = () => {
    dispatch({
      type: "SET_PREVIEW_WALLPAPER",
      payload: null,
    });
  };

  return (
    <Box className="App" backgroundColor="#22212c" minH="100vh" h="full">
      <Modal
        image={state.previewWallpaper}
        removeImage={removePreview}
        setWallpaper={setWallpaper}
        onSelectTag={getCollection}
        dispatch={dispatch}
      />

      <Grid templateColumns={"200px 1fr"} gap={2}>
        <GridItem
          w="100%"
          height="100vh"
          position="sticky"
          top={0}
          backgroundColor="#24232F"
        >
          <Sidebar
            state={state}
            getCollection={getCollection}
            dispatch={dispatch}
          />
        </GridItem>
        <GridItem w="100%">
          <VStack marginTop={4} spacing={4}>
            <TopBar ratios={ratios} dispatch={dispatch} state={state} />
            <Gallery
              state={state}
              dispatch={dispatch}
              getCollection={getCollection}
              setWallpaper={setWallpaper}
            />
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}
