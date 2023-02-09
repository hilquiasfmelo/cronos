import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',
  border: '2px solid $gray200',

  '::-webkit-scrollbar': {
    width: '$2',
  },

  '::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px $colors$gray400',
    borderRadius: '$sm',
  },

  '::-webkit-scrollbar-thumb': {
    background: '$blue300',
    borderRadius: '$sm',
  },

  '::-webkit-scrollbar-thumb:hover': {
    background: '$blue500',
  },

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '2px solid $gray200',
  padding: '$6 $6 0',
  overflowY: 'scroll',

  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '> span': {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

export const TimePickerItem = styled('button', {
  backgroundColor: '$white',
  padding: '$2 0',
  cursor: 'pointer',
  borderRadius: '$sm',
  color: '$gray600',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$bold',
  border: '2px solid $gray200',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    border: '2px solid $gray200',
    color: '$gray400',
    opacity: 0.4,
  },

  '&:not(:disabled)&:not(:focus):hover': {
    fontWeight: 'bold',
    border: '2px solid $blue300',
    color: '$blue300',
  },

  '&:focus': {
    background: '$blue300',
    border: '2px solid $blue300',
    color: '$white',
    fontWeight: '$bold',
  },
})
