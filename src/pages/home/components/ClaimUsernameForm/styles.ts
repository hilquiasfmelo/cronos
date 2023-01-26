import { Box } from '@/components/Box'
import { styled } from '@/styles'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',
  boxShadow: 'rgba(0, 0, 0, 0.35) 5px 5px 15px',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const FormAnnotation = styled('div', {
  marginTop: '$3',
})
