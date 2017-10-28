module.exports = {
  components: 'src/**/[A-Z]*.js',
  webpackConfig: require('./config/webpack.config.dev.js'),
  skipComponentsWithoutExample: false,
  styleguideDir: './',
  showCode: true,
  showUsage: true,  theme: {
    color: {
      link: 'firebrick',
      linkHover: 'salmon',
    }
  },
};