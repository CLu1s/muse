import { HStack, Box } from "@chakra-ui/react";
import { State } from "../types";
import MenuButton from "./MenuButton";
import { fetchDataSearch, getImage, fetchDataCollection } from "../functions";
import Account from "./Account";

type Props = {
  ratios: string[];
  dispatch: React.Dispatch<any>;
  state: State;
};

const TopBar = ({ ratios, dispatch, state }: Props) => {
  const { currentWallpaper } = state;

  const landscapeIsActive = ratios.includes("landscape");
  const portraitIsActive = ratios.includes("portrait");

  const onChange = (ratio: string) => {
    const newRatios = ratios.includes(ratio)
      ? ratios.filter((r) => r !== ratio)
      : [...ratios, ratio];
    dispatch({
      type: "SET_RATIOS",
      payload: newRatios,
    });
  };

  const setRandom = async () => {
    const page = Math.floor(Math.random() * state.metadata.last_page);
    const imageIndex = Math.floor(Math.random() * state.metadata.per_page);
    const {
      purity,
      categories,
      currentCollection: collection,
      searchValue,
      apiKey,
      userName,
    } = state;
    console.log("userName", userName);
    let data;
    if (searchValue) {
      data = await fetchDataSearch({
        searchValue,
        page,
        purity,
        categories,
        ratios,
        apiKey,
      });
    } else {
      data = await fetchDataCollection({
        collection,
        page,
        purity,
        categories,
        ratios,
        apiKey,
        userName,
      });
    }

    const imageToSet = data.data[imageIndex];
    await getImage(imageToSet);
    dispatch({
      type: "SET_CURRENT_WALLPAPER",
      payload: imageToSet,
    });
    dispatch({
      type: "SET_CURRENT_INDEX",
      payload: imageIndex,
    });
  };

  const onSeeCurrent = async () => {
    dispatch({
      type: "SET_PREVIEW_WALLPAPER",
      payload: currentWallpaper,
    });
  };

  return (
    <HStack
      backgroundColor="#22212c"
      width="full"
      position="sticky"
      top="0"
      zIndex={10}
      justifyContent="space-between"
      padding={4}
      spacing={10}
    >
      <Box width="90%" display="flex" justifyContent="center">
        <HStack justifyContent="center">
          <MenuButton
            align="center"
            isActive={landscapeIsActive}
            onClick={() => onChange("landscape")}
          >
            Landscape
          </MenuButton>
          <MenuButton
            isActive={portraitIsActive}
            align="center"
            onClick={() => onChange("portrait")}
          >
            Portrait
          </MenuButton>
        </HStack>
        <HStack>
          <MenuButton align="center" isActive onClick={() => setRandom()}>
            Select Random
          </MenuButton>
          {currentWallpaper && (
            <MenuButton align="center" isActive onClick={onSeeCurrent}>
              See Current
            </MenuButton>
          )}
        </HStack>
      </Box>

      <Box width="6rem" paddingX="2">
        <Account dispatch={dispatch} />
      </Box>
    </HStack>
  );
};

export default TopBar;
