/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beigeNormal: '#98908B',
        beigeLight: '#F8F4F0',
        greyDark: '#201F24',
        greyNormal: '#696868',
        greyMedium: '#B3B3B3',
        greyLight: '#F2F2F2',
        white: '#ffffff',
        green: '#277C78',
        yellow: '#F2CDAC',
        cyan: '#82C9D7',
        navy: '#626070',
        red: '#C94736',
        violet: '#826CB0',
        purple: '#AF81BA',
        turquoise: '#597C7C',
        brown: '#93674F',
        magenta: '#934F6F',
        blue: '#3F82B2',
        navyGrey: '#97A0AC',
        armyGreen: '#7F9161',
        gold: '#CAB361',
        orange: '#BE6C49',
      },
      fontFamily: {
        sans: ['Manrope', 'serif'],
      },
      screens: {
        tablet: '786px',
        desktop: '1024px',
      },
      minWidth: {
        '600': '600px',
        '670': '670px',
        '786': '786px',
        '1000': '1000px',
      },
      fontSize: {
        'preset1': ['32px', { lineHeight: '120%', letterSpacing: '0px' }],
        'preset2': ['20px', { lineHeight: '120%', letterSpacing: '0px' }],
        'preset3': ['16px', { lineHeight: '150%', letterSpacing: '0px' }],
        'preset4': ['14px', { lineHeight: '150%', letterSpacing: '0px' }],
        'preset4Bold': ['14px', { lineHeight: '150%', letterSpacing: '0px', fontWeight: '800' }],
        'preset5': ['12px', { lineHeight: '150%', letterSpacing: '0px' }],
        'preset5Bold': ['12px', { lineHeight: '150%', letterSpacing: '0px', fontWeight: '800' }],
      },
    },
  },
  plugins: [],
}
