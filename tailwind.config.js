/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        'aspect-square': 'aspect-ratio: 1 / 1',
        'w-80': 'width: 30 rem',
        'h-80': 'height: 30 rem',
      },
      colors: {
        main: {
          // DARK

          'dark-1': '#000',
          'dark-2': '#111',
          'dark-3': '#ff3c00',
          'dark-4': '#fc996f',
          // 'dark-3': '#8DBBFE',
          // 'dark-4': '#8DBBFE',
          'dark-5': '#ff3c00',
          'dark-6': '#fc996f',
          'dark-text': '#E8E9F1',
          border: '#efefef',
          'dark-important-text': '#6D7388',
          'dark-1-transparent': '#000000BB',
          'dark-2-transparent': '#2E3651BB',
          'dark-5-transparent': '#671199AA',
          'dark-cross': '#B7B7B7',
          'dark-check': '#B7B7B7',
          'dark-3-transparent': '#4e25a3AA',

          // LIGHT

          1: '#FFF',
          '1-transparent': '#FFFFFFBB',
          2: '#F7F6F9',
          3: '#ff3c00',
          4: '#fc996f',
          // 'dark-3': '#8DBBFE',
          // 'dark-4': '#8DBBFE',
          5: '#ff3c00',
          6: '#fc996f',
          // 3: '#20446A',
          // 4: '#20446A',
          // 5: '#20446A',
          // 6: '#20446A',
          text: '#3A446A',
          'dark-border': '#efefef',
          'important-text': '#6A7495',
          'text-transparent': '#3A446AAA',
          '2-transparent': '#F7F6F9CC',
          '5-transparent': '#671199AA',
          cross: '#B7B7B7',
          check: '#B7B7B7',
          '3-transparent': '#20446ABB',
        },
      },
    },
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
