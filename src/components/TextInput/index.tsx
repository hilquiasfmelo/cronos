import { ComponentProps, forwardRef } from 'react'
import { Input, Prefix, TextInputContainer } from './styles'

export interface TextInputProps
  extends Omit<ComponentProps<typeof Input>, 'size'> {
  prefix?: string
  size?: ComponentProps<typeof TextInputContainer>['size']
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ prefix, size, ...rest }: TextInputProps, ref) => {
    return (
      <TextInputContainer size={size}>
        {!!prefix && <Prefix>{prefix}</Prefix>}
        <Input ref={ref} {...rest} />
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
