const purgecss = require('@fullhuman/postcss-purgecss')({
  // paths to all of the template files in the project
  content: ['./src/**/*.html', './src/**/*.tsx', './public/**/*.html'],

  // default extractor including tailwind's special characters
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),
  ],
};
