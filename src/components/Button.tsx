import { ComponentProps, ElementType } from 'react'
import { styled } from '../styles'

export const Button = styled('button', {
  all: 'unset',
  borderRadius: '$sm',
  fontSize: '$sm',
  fontWeight: '$bold',
  fontFamily: '$default',
  textAlign: 'center',
  minWidth: 120,
  boxSizing: 'border-box',
  padding: '0 $4',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',

  cursor: 'pointer',

  svg: {
    width: '$4',
    height: '$4',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      primary: {
        color: '$white',
        background: '$blue500',

        '&:not(:disabled):hover': {
          background: '$blue300',
        },

        '&:disabled': {
          backgroundColor: '$gray200',
        },
      },

      secondary: {
        color: '$blue300',
        border: '2px solid $blue500',

        '&:not(:disabled):hover': {
          background: '$blue500',
          color: '$white',
        },

        '&:disabled': {
          color: '$gray200',
          borderColor: '$gray200',
        },
      },

      tertiary: {
        color: '$gray500',
        border: '1px solid $gray400',

        '&:not(:disabled):hover': {
          color: '$red300',
          fontWeight: '$bold',
          border: '1px solid $red300',
        },

        '&:disabled': {
          color: '$gray100',
          borderColor: '$gray200',
        },
      },
    },

    size: {
      sm: {
        height: 38,
      },

      md: {
        height: 46,
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}
