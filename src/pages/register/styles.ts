import { styled } from '@/styles'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Box } from '@/components/Box'

export const Container = styled('main', {
  maxWidth: 672,
  margin: '$20 auto $4',
  padding: '0 $6',
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    marginBottom: '$6',
  },
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  boxShadow: 'rgba(0, 0, 0, 0.35) 5px 5px 15px',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})
