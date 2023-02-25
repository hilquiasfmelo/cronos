import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const ConfirmForm = styled(Box, {
  maxWidth: 480,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray600',
      width: '$5',
      height: '$5',
    },
  },
})

export const SeparationContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$4',

  select: {
    padding: '$3 $4',
    borderRadius: '$sm',
    border: 0,
    fontSize: '$sm',
    color: '$gray400',
    background: '$gray100',

    option: {
      padding: '$3 $4',
      backgroundColor: '$blue300',
      fontWeight: '$bold',
      color: '$white',
    },
  },
})

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$2',
})
