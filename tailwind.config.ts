import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  
    extend: {

      direction: {
        rtl: 'rtl',
      },
      fontFamily: {
        Yekan:'Yekan',
        vazir:'vazir',
        vazirthin:"vazirthin"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),    require('tailwind-scrollbar'),
  ],
} satisfies Config

export default config