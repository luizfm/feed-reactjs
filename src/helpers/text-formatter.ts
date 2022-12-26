export const pluralHandler = (value: number) => {
  return value === 1 || value === -1 ? "" : "s";
};
