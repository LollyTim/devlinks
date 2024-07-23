import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        instrumentSans: ["Instrument Sans, sans-serif"],
      },

      boxShadow: {
        custom: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
      colors: {
        whiteClr: "#FFFFFF",
        primaryClr: {
          100: "#EFEBFF",
          200: "#BEADFF",
          300: "#633CFF",
        },

        secondaryClr: {
          black: "#333333",
          default: "#737373",
          100: "#FAFAFA",
          200: "#D9D9D9",
          300: "#737373",
        },

        accent: {
          default: "#FF3939",
        },
      },
    },
  },
  plugins: [],
};
export default config;
