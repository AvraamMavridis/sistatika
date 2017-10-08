module.exports = {
  components: 'src/**/[A-Z]*.js',
  webpackConfig: require('./config/webpack.config.dev.js'),
  skipComponentsWithoutExample: true,
};