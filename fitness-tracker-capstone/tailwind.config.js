/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#0A0A0A",
          white: "#FFFFFF",
          gray: "#1C1C1C",
        },
        accent: {
          neonBlueViolet: "#8A2BE2", // Blue-Violet
          teal: "#00BFA6",
          redOrange: "#FF4500",
        },
      },
      fontFamily: {
        techno: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "noise": "url('/assets/textures/noise.png')",
        "geometry": "url('/assets/textures/geometry.svg')",
        "frosted": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
