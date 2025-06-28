/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        brand: {
          DEFAULT: "#0EB095",
          light: "#E0F7F3",
          dark: "#0A7D6A",
          100: "#E0F7F3",
          400: "#0EB095",
          600: "#0A7D6A",
          cart: "#FFC43F",
        },

        // Text colors
        text: {
          primary: "#222222",
          secondary: "#727272",
          inverted: "#FFFFFF",
        },

        // Background colors
        bg: {
          DEFAULT: "#FFFFFF",
          light: "#FAFAFA",
          dark: "#F5F5F5",
        },

        // UI elements
        ui: {
          gray: "#DBDBDB",
          success: "#A3BE4C",
          "success-dark": "#2E7D32",
          warning: "#FFC43F",
          "warning-dark": "#F57C00",
          error: "#E53E3E",
          "error-dark": "#C62828",
          // Adding red variants under ui for wishlist
          "red-light": "#FEE2E2",  // equivalent to red-100
          "red-medium": "#FCA5A5", // equivalent to red-300
          "red-dark": "#EF4444",   // equivalent to red-500
          "red-darker": "#DC2626", // equivalent to red-600
        },

        // Gradients
        gradient: {
          hero: {
            start: "#F0F9FF",
            end: "#F0FDF4",
          },
        },
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        heading: ["Nunito", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "3rem",
          "2xl": "3rem",
        },
      },
      boxShadow: {
        card: "0px 5px 22px rgba(0, 0, 0, 0.04)",
        "card-hover": "0px 21px 44px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "marquee-md": "marquee-md 13s linear infinite",
      },
      keyframes: {
        "marquee-md": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
