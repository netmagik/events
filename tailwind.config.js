module.exports = {
  content: ["./src/**/*.{html,js}",  "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'darkgreen': '#243c5a',
        'lightgreen': '#2A9D8F',
        'yellow': '#E9C46A',
        'orange': '#F4A261',
        'darkorange': '#E76F51',
      },
      fontFamily: {
        body: ['Poppins']
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  content: ["./views/**/*.ejs"],
}