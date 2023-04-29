const convertPurity = (purity: string[]) => {
  const sfw = purity.includes("sfw") ? "1" : "0";
  const sketchy = purity.includes("sketchy") ? "1" : "0";
  const nsfw = purity.includes("nsfw") ? "1" : "0";

  return `${sfw}${sketchy}${nsfw}`;
};

export default convertPurity;
