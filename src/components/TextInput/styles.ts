import { styled } from '../../styles'

export const TextInputContainer = styled('div', {
  backgroundColor: '$gray100',
  padding: '$3 $4',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '2px solid $gray100',
  display: 'flex',
  alignItems: 'baseline',

  '&:has(input:focus)': {
    borderColor: '$blue300',
  },

  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  variants: {
    size: {
      sm: {
        padding: '$2 $3',
      },
      md: {
        padding: '$3 $4',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export const Prefix = styled('span', {
  fontSize: '$sm',
  color: '$gray500',
  fontWeight: '$regular',
})

export const Input = styled('input', {
  fontSize: '$sm',
  color: '$gray900',
  fontWeight: 'regular',
  background: 'transparent',
  border: 0,
  width: '100%',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:placeholder': {
    color: '$gray100',
  },
})
