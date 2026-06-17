/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          sage: "var(--brand-sage)",
          ivory: "var(--brand-ivory)",
          olive: "var(--brand-olive)",
          paper: "var(--brand-paper)",
          champagne: "var(--brand-champagne)",
          white: "var(--brand-white)",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "Manrope",
          "Noto Sans Myanmar",
          "Pyidaungsu",
          "Padauk",
          "sans-serif",
        ],
      },
      boxShadow: {
        glass: "0 24px 70px rgba(48, 50, 41, 0.14)",
        paper: "0 22px 60px rgba(48, 50, 41, 0.16)",
        soft: "0 16px 40px rgba(48, 50, 41, 0.10)",
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at 15% 10%, rgba(255,255,255,0.75), transparent 28%), linear-gradient(135deg, rgba(246,243,234,0.96), rgba(231,225,213,0.72))",
      },
    },
  },
  plugins: [],
};
