import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { keyframes, styled } from '@/styles'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    margin: '$2',
    color: '$gray400',
  },
})

const pulse = keyframes({
  '0%': { transform: 'scale(0.95)' },
  '70%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0.95)' },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  img: {
    animation: `${pulse} 3s linear infinite`,
  },

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
