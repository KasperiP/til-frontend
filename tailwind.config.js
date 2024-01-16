/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        custom: {
          css: {
            '--tw-prose-headings': theme('colors.typography.primary'),
            '--tw-prose-links': theme('colors.sky.800'),
            '--tw-prose-bold': theme('colors.typography.primary'),
          },
        },
      }),
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
