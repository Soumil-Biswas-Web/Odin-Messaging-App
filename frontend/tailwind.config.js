/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'background-color': 'var(--background-color)',
      'background-color-offset': 'var(--background-color-offset)',
      'highlight-color': 'var(--highlight-color)',
      'highlight-hover-color': 'var(--highlight-hover-color)',
      'contrast-color': 'var(--contrast-color)',
      'contrast-color-offset': 'var(--contrast-color-offset)',
    },
    backgroundImage: {
      'highlight-gradient': 'var(--highlight-gradient)',
      'background-gradient': 'var(--background-gradient)',
    },
    screens: {
      'xs': '420px',
      'tall': { 'raw': '(min-height: 700px)' },
    },
  },
};
export const plugins = [
  plugin(function({ addComponents }) {
    addComponents({
      '.magic-center': {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
      },
      '.magic-border': {
        'background-color': 'var(--background-color)', // custom CSS vars if you use them
        'border-width': '1px',
        'border-color': 'var(--contrast-color-offset)',
        'border-radius': '1rem' // rounded-lg = 0.5rem
      },
      '.scrollbar-none': {
        '-ms-overflow-style': 'none',  /* IE and Edge */
        'scrollbar-width': 'none'     /* Firefox */
      }
    })
  })
];
export const darkMode = ['selector', '[data-mode="dark"]'];