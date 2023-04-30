import MenuButton from "./MenuButton";
import MenuButtonsContainer from "./MenuButtonsContainer";

type Categories = string[];

type Props = {
  dispatch: (action: any) => void;
  value: Categories;
};
const CategoriesFilters = ({ dispatch, value }: Props) => {
  const categories = value;
  const setCategories = (value: Categories) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "SET_CATEGORIES",
      payload: value,
    });
  };
  const handleCategory = (key: keyof Categories) => {
    const toRemove = categories.includes(key as string);
    if (toRemove) {
      const newCategories = categories.filter((item) => item !== key);
      setCategories(newCategories as Categories);
    } else {
      const newCategories = [...categories, key] as Categories;
      setCategories(newCategories as Categories);
    }
  };

  return (
    <MenuButtonsContainer title="Categories">
      <MenuButton
        isActive={categories.includes("general")}
        onClick={() => {
          handleCategory("general" as keyof Categories);
        }}
      >
        General
      </MenuButton>
      <MenuButton
        isActive={categories.includes("anime")}
        onClick={() => {
          handleCategory("anime" as keyof Categories);
        }}
      >
        Anime
      </MenuButton>
      <MenuButton
        isActive={categories.includes("people")}
        onClick={() => {
          handleCategory("people" as keyof Categories);
        }}
      >
        People
      </MenuButton>
      <MenuButton
        isActive={categories.includes("AI_ART")}
        onClick={() => {
          handleCategory("AI_ART" as keyof Categories);
        }}
      >
        AI Art
      </MenuButton>
    </MenuButtonsContainer>
  );
};

export default CategoriesFilters;
