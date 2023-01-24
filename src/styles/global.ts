import { globalCss } from './index'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$white',
    color: '$gray500',
    '-webkit-font-smoothing': 'antialiased',
    fontFamily: 'Roboto, sans-serif',
  },
})
