import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#03040b",
          900: "#080b18",
          800: "#11172a",
          700: "#1c2844"
        },
        nebula: {
          cyan: "#6de5ff",
          violet: "#a78bfa",
          amber: "#f7c76b",
          rose: "#fb7185"
        }
      },
      boxShadow: {
        glow: "0 0 50px rgba(109, 229, 255, 0.16)",
        "inner-glass": "inset 0 1px 0 rgba(255,255,255,0.14)"
      },
      backgroundImage: {
        "radial-orbit":
          "radial-gradient(circle at center, rgba(109,229,255,0.16), transparent 34%), radial-gradient(circle at 78% 20%, rgba(167,139,250,0.14), transparent 28%), radial-gradient(circle at 16% 76%, rgba(247,199,107,0.1), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
