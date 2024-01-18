/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: '#09090A',
        body: '#0b1824',
        main: '#0B1824',
        tile: '#0F1F2D',
        tileDarker: '#0A171D',
        tileLighter: '#1C354E',
        navbar: '#f2f4fa',
        navbarHover: '#8992ad',
        green: '#007A7A',
        red: '#CB0000',
        orange: '#BA3800',
        light: '#2A2C33',
        text: '#dedede',
      },
      backgroundImage: {
        'login': "url('./assets/login-background.jpg')",
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

/* $magenta-haze: #A54773ff;
$space-cadet: #2A2E53ff;
$oxford-blue: #141E37ff;
$marian-blue: #354081ff;
$robin-egg-blue: #49BFC5ff; */

