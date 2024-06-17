/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/flowbite/**/*.js", // Add this line to include Flowbite components
   ],

   theme: {
      extend: {},
   },
   // plugins: [],
   darkMode: "class",
   plugins: [require("flowbite/plugin")],
};
