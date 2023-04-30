const convertCategories = (categories: string[]) => {
  const general = categories.includes("general") ? "1" : "0";
  const anime = categories.includes("anime") ? "1" : "0";
  const people = categories.includes("people") ? "1" : "0";
  const AIArt = categories.includes("AI_ART")
    ? "ai_art_filter=0"
    : "ai_art_filter=1";

  return `${general}${anime}${people}&${AIArt}`;
};

export default convertCategories;
