import { ComponentProps, styled } from '@stitches/react'
import { ElementType } from 'react'

export const Box = styled('div', {
  padding: '$4',
  borderRadius: '$md',
  backgroundColor: '$white',
  border: '2px solid $blue300',
})

export interface BoxProps extends ComponentProps<typeof Box> {
  as?: ElementType
}
