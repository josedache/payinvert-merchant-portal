// import resolveTailwindConfig from "tailwindcss/resolveConfig";
import tailwindDefaultTheme from "tailwindcss/defaultTheme";
// import tailwindConfig from "configs/tailwind";

// const resolvedTailwindConfig = resolveTailwindConfig(tailwindConfig);

/** @enum {string} */
export const MediaBreakpoint = {
  "2XL": `(min-width: ${tailwindDefaultTheme.screens["2xl"]})`,
  LG: `(min-width: ${tailwindDefaultTheme.screens.lg})`,
  MD: `(min-width: ${tailwindDefaultTheme.screens.md})`,
  SM: `(min-width: ${tailwindDefaultTheme.screens.sm})`,
  XL: `(min-width: ${tailwindDefaultTheme.screens.xl})`,
};

export default MediaBreakpoint;
