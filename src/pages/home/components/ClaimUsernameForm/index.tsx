import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FlagCheckered, Spinner } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Text } from '@/components/Text'
import { Toast } from '@/lib/react-toastify/toasts'

import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 03 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          prefix="oabma/"
          placeholder="seu-usuario"
          {...register('username')}
        />

        {isSubmitting ? (
          <Button variant="spinner" disabled>
            <Spinner />
          </Button>
        ) : (
          <Button size="md" type="submit">
            Iniciar
            <FlagCheckered />
          </Button>
        )}
      </Form>

      <FormAnnotation>
        <Text size="sm">Digite o seu melhor nome de usuário</Text>
      </FormAnnotation>

      {!!errors.username &&
        Toast({
          message: String(errors.username.message),
          type: 'error',
        })}
    </>
  )
}
