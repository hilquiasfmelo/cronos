import { styled } from '@/styles'
import { Box } from '@/components/Box'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'rgba(0, 0, 0, 0.35) 5px 5px 15px',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '2px solid $gray200',
  padding: '$4 $6',
  borderRadius: '$md',
  fontWeight: '$medium',

  marginBottom: '$4',
})
