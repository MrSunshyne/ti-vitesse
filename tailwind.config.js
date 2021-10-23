const colors = require('tailwindcss/colors')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  variants: {
    extend: {
      backgroundColor: ['odd'],
      textAlign: ['last'],
    },
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          DEFAULT: '#E31E88',
          50: 'hsl(var(--brand-hue), 78%, 95%)',
          100: 'hsl(var(--brand-hue), 78%, 90%)',
          200: 'hsl(var(--brand-hue), 78%, 80%)',
          300: 'hsl(var(--brand-hue), 78%, 70%)',
          400: 'hsl(var(--brand-hue), 78%, 60%)',
          500: 'hsl(var(--brand-hue), 78%, 50%)',
          600: 'hsl(var(--brand-hue), 78%, 40%)',
          700: 'hsl(var(--brand-hue), 78%, 30%)',
          800: 'hsl(var(--brand-hue), 78%, 20%)',
          900: 'hsl(var(--brand-hue), 78%, 10%)',
        },
        surface: {
          DEFAULT: 'var(--surface-1)',
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        text: {
          DEFAULT: 'var(--text-0)',
          0: 'var(--text-0)',
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        border: {
          DEFAULT: 'var(--border-0)',
          0: 'var(--border-0)',
          1: 'var(--border-1)',
          2: 'var(--border-2)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-0)',
          },
        },
      },
      screens: {
        '2xl': '1536px',
      },
      maxWidth: {
        '8xl': '100rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    function({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]

          const newVars
            = typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      })
    },
  ],
}
