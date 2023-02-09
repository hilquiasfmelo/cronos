import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  '> span': {
    color: '$gray200',
  },
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$4',
  color: '$gray200',

  '> button': {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$blue300',
      color: '$blue300',
    },
  },
})

export const CalendarBody = styled('table', {
  width: '100%',
  borderSpacing: '0.40rem',
  tableLayout: 'fixed',

  '> thead th': {
    color: '$gray500',
    fontWeight: '$medium',
    fontSize: '$sm',
    paddingBottom: '$4',
  },
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1/1',
  background: '$white',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',
  border: '2px solid $gray200',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
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
