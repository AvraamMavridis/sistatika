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
    },
  },
  sections: [
    {
      name: 'HoC Components',
      components: './src/components/HoC/**/*.js',
    },
    {
      name: 'Charts',
      components: './src/components/Charts/**/*.js',
    },
    {
      name: 'UI Components',
      components: './src/components/UI/**/*.js',
    },
  ],
};
