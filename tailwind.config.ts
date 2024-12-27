import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customLightSilver:"#819eb3",
        customDarkSilver:"#202a31",
        customMediumDarkSilver:"#3a4852",
        customMediumLightSilver:"#607685"
      },
    },
  },
  plugins: [],
} satisfies Config;
