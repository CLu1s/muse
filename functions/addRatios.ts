const addRatios = (ratios: string[]) => {
  return `ratios=${ratios.join("%2C")}`;
};

export default addRatios;
