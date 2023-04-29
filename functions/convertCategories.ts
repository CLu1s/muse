const convertCategories = (categories: string[]) => {
  const general = categories.includes("general") ? "1" : "0";
  const anime = categories.includes("anime") ? "1" : "0";
  const people = categories.includes("people") ? "1" : "0";

  return `${general}${anime}${people}`;
};

export default convertCategories;
