import { globalCss } from './index'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    fontFamily: 'Roboto, sans-serif',
    color: '$gray500',
    '-webkit-font-smoothing': 'antialiased',
  },
})
