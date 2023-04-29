import { useState } from "react";
import { VStack, Input } from "@chakra-ui/react";
import MenuButton from "./MenuButton";
import MenuButtonsContainer from "./MenuButtonsContainer";

type Props = {
  onSearch: (collection: number, page: number, term: string) => void;
  dispatch: React.Dispatch<any>;
};

const Search = ({ onSearch, dispatch }: Props) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search) return;
    dispatch({
      type: "SET_SEARCH_VALUE",
      payload: search,
    });
    onSearch(0, 1, search);
  };

  return (
    <MenuButtonsContainer title="Search">
      <VStack justify="flex-start" alignItems="flex-start">
        <Input
          variant="filled"
          placeholder="Term, id"
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
          _focus={{ color: "white" }}
        />
      </VStack>
      <MenuButton onClick={handleSearch} isActive={false}>
        Buscar
      </MenuButton>
    </MenuButtonsContainer>
  );
};

export default Search;
