/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          ivory: "#FFFFF0",
          DEFAULT: "#FFFFF0",
        },
        accent: {
          gold: "#D4AF37",
          DEFAULT: "#D4AF37",
        },
        secondary: {
          charcoal: "#333333",
          DEFAULT: "#333333",
        },
        optional: {
          "dusty-rose": "#DCAE96",
        },
        neutral: {
          1: "#BFA6A0",
          2: "#A8A8A8",
        },
        highlight: {
          pearl: "#FAF9F6",
          DEFAULT: "#FAF9F6",
        },
        error: {
          coral: "#FF6F61",
          DEFAULT: "#FF6F61",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "DM Serif Display", "serif"],
        sans: ["Inter", "Open Sans", "Lato", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out", // Reduced from 0.6s
        "slide-up": "slideUp 0.5s ease-out", // Reduced from 0.8s
        "scale-in": "scaleIn 0.4s ease-out", // Reduced from 0.5s
        float: "float 2s ease-in-out infinite", // Reduced from 3s
        glow: "glow 1.5s ease-in-out infinite alternate", // Reduced from 2s
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" }, // Reduced from 30px
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" }, // Reduced from 0.9
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }, // Reduced from -10px
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #D4AF37" },
          "100%": { boxShadow: "0 0 15px #D4AF37, 0 0 25px #D4AF37" }, // Reduced from 20px, 30px
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
