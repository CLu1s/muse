import React from "react";
import { VStack } from "@chakra-ui/react";
import CollectionsMenu from "./CollectionsMenu";
import PurityFilters from "./PurityFilters";
import CategoriesFilters from "./CategoriesFilters";
import Options from "./Slides";
import Search from "./Search";
import { State } from "../types";

interface Props {
  state: State;
  getCollection: (collection: number, page: number, term?: string) => void;
  dispatch: React.Dispatch<any>;
}
const Sidebar = ({ getCollection, dispatch, state }: Props) => {
  return (
    <VStack spacing={1} position="sticky" top={0} paddingTop="2">
      <Search onSearch={getCollection} dispatch={dispatch} />
      <CollectionsMenu
        state={state}
        getCollection={getCollection}
        dispatch={dispatch}
      />
      <CategoriesFilters dispatch={dispatch} value={state.categories} />
      <PurityFilters dispatch={dispatch} value={state.purity} />
      <Options
        dispatch={dispatch}
        currentIndex={state.currentIndex}
        metadata={state.metadata}
        isActivated={state.isSlideActive}
        intervalID={state.intervalID ?? 0}
      />
    </VStack>
  );
};

export default Sidebar;
