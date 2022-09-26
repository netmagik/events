module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'bg-color': '#243c5a',
        'bg-variant': '#2A9D8F',
        'color-primary': '#E9C46A',
        'color-primary-variant': '#F4A261',
        'color-secondary': '#E76F51',
        'color-primary-variant': '#F4A261',
      },
    },
  },
  plugins: [],
}