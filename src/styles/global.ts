import { globalCss } from '@stitches/react'

export const globalStyles = globalCss({
  ':root': {
    '--white': '#FFFFFF',

    '--gray100': '#E1E1E6',
    '--gray200': '#A9A9B2',
    '--gray400': '#7C7C8A',
    '--gray500': '#505059',
    '--gray600': '#323238',
    '--gray900': '#121214',

    '--blue300': '#076ABD',
    '--blue500': '#065597',
    '--blue700': '#054071',

    '--red300': '#AC1E1C',
    '--red500': '#8A1817',
    '--red700': '#691211',
  },

  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: 'var(--white)',
    color: 'var(--gray500)',
    '-webkit-font-smoothing': 'antialiased',
  },
})
