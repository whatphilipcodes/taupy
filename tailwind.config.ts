import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src-front/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

