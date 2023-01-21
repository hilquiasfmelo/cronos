import { keyframes, styled } from '@stitches/react'
import { Heading, Text } from '@oabma-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '5rem',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 2.5rem',

  [`> ${Heading}`]: {
    color: 'var(--gray600)',

    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    margin: '0.5rem',
    color: 'var(--gray200)',
  },
})

const pulse = keyframes({
  '0%': { transform: 'scale(0.95)' },
  '70%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0.95)' },
})

export const Preview = styled('div', {
  paddingRight: '2rem',
  overflow: 'hidden',

  img: {
    animation: `${pulse} 3s linear infinite`,
  },

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
