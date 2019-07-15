module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-cssnext': options.cssnext ? options.cssnext : false,
    'autoprefixer': options.autoprefixer ? options.autoprefixer : false,
    'cssnano': env === 'production' && options.cssnano ? options.cssnano : false
  }
})
