export const FartModes = {
  NATURAL: "sometimes",
  FREQUENT: "frequently",
  ALLWAYS: "allways",
  BAZOOKA: "bazooka",
} as const;
type FartMode = (typeof FartModes)[keyof typeof FartModes];

export default FartMode;
