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
      fontFamily: {
        Yekan:'Yekan'
      },
    },
  },
  plugins: [require("tailwindcss-animate"),    require('tailwind-scrollbar'),
  ],
} satisfies Config

export default config