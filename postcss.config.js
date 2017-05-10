module.exports = {
  plugins: {
    'precss': {},
    'autoprefixer': {
      browsers: ['last 2 versions', '> 5%']
    },
    'postcss-reporter': {},
    'postcss-browser-reporter': process.env.NODE_ENV === 'production' 
      ? {}
      : false
  }
}
