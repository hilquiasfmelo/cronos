import { ComponentProps } from 'react'
import { styled } from '../styles'

export const TextArea = styled('textarea', {
  backgroundColor: '$gray100',
  padding: '$3 $4',
  borderRadius: '$sm',
  border: '2px solid $gray100',

  fontSize: '$sm',
  color: '$gray900',
  fontWeight: '$regular',
  resize: 'vertical',
  minHeight: 120,

  '&:focus': {
    outline: 0,
    borderColor: '$blue300',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  '&:placeholder': {
    color: '$gray200',
  },
})

export interface TextAreaProps extends ComponentProps<typeof TextArea> {}
