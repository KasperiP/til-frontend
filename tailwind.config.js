/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        divider: 'var(--divider)',
        typography: {
          primary: 'var(--typography-primary)',
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          '--divider': '#f3f3f3',
          'neutral-content': '#f3f3f3',
          'base-100': '#fff',
          neutral: '#fff',
          '--typography-primary': '#202125',
        },
      },
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#f7f0cd',
          '--divider': '#f3f3f3',
          'neutral-content': '#f3f3f3',
          'base-100': '#fff',
          neutral: '#f5f5f5',
          '--typography-primary': '#202125',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
