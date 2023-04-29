import { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import MenuButtonsContainer from "./MenuButtonsContainer";
import { State } from "../types";
import { fetchCollections } from "@/functions";

type Props = {
  state: State;
  dispatch: (action: any) => void;
  getCollection: (id: number, page: number) => void;
};

const globalCollections = [
  {
    id: 1,
    name: "Top",
  },
  {
    id: 2,
    name: "Hot",
  },
];

const CollectionsMenu = ({ state, dispatch, getCollection }: Props) => {
  const { currentCollection, collections, apiKey } = state;
  const [isLoading, setIsLoading] = useState(false);
  const getCollections = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const payload = await fetchCollections(apiKey);
      dispatch({
        type: "SET_COLLECTIONS",
        payload,
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (!apiKey) return;
    console.count("getCollections");
    getCollections();
  }, [apiKey]);

  const setCollections = (id: number) => {
    dispatch({
      type: "SET_CURRENT_COLLECTION",
      payload: id,
    });
    getCollection(id, 1);
  };

  const renderCollections =
    collections.length > 0 &&
    collections.map((item: any) => (
      <MenuButton
        key={item.id}
        onClick={() => {
          setCollections(item.id);
        }}
        isActive={currentCollection === item.id}
      >
        {item.label}
      </MenuButton>
    ));

  const globalCollectionsRender = globalCollections.map((item: any) => (
    <MenuButton
      key={item.id}
      isActive={currentCollection === item.id}
      onClick={() => {
        window.scrollTo(0, 0);
        setCollections(item.id);
      }}
    >
      {item.name}
    </MenuButton>
  ));

  return (
    <MenuButtonsContainer title="Collections">
      {collections.length > 0 && renderCollections}
      {globalCollectionsRender}
    </MenuButtonsContainer>
  );
};

export default CollectionsMenu;
