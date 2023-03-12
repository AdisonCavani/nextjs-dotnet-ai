import tailwindConfig from "../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";

const cfg = resolveConfig(tailwindConfig).theme!;

type NonNullableConfig = {
  [K in keyof typeof cfg]-?: NonNullable<(typeof cfg)[K]>;
};

export const twindConfig = cfg as NonNullableConfig;

type ColorIndex = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ColorRecordType = Record<ColorIndex, string>;
