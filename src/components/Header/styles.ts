import { styled } from '../../styles/index'
import { Text } from '../Text'
import { Button } from '../Button'

export const Container = styled('header', {
  maxWidth: '100%',
  height: '$16',
  borderBottom: '1px solid $gray100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.1) 0px 3px 7px -3px',
})

export const Content = styled('div', {
  marginLeft: '$40',
  fontWeight: '$bold',
  textDecoration: 'none',

  [`> ${Text}`]: {
    color: '$blue700',
  },

  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

export const SchedulesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  [`> ${Text}`]: {
    all: 'unset',
    color: '$blue700',
    fontWeight: '$medium',
    cursor: 'pointer',

    '&:hover': {
      color: '$blue300',
    },
  },

  '&:hover': {
    color: '$blue300',
  },
})

export const SessionStatus = styled('div', {
  marginRight: '$40',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  [`> ${Text}`]: {
    color: '$gray600',
    fontWeight: '$medium',
  },

  [`> ${Button}`]: {
    all: 'unset',
    fontSize: '$sm',
    padding: '$2 $4',
    background: '$blue500',
    border: '1px solid $blue500',
    borderRadius: '$xs',
    cursor: 'pointer',
    transition: '0.4s',
    color: '$white',
    fontWeight: '$medium',

    display: 'flex',
    alignItems: 'center',
    gap: '$1',

    '&:not(:disabled):hover': {
      background: '$blue300',
      border: '1px solid $blue300',
      color: '$white',
    },
  },
})
