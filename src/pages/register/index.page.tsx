import { ArrowRight } from 'phosphor-react'

import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'

import { Container, Form, Header } from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/utils/react-toastify/toasts'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 03 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

async function handleRegister(data: RegisterFormData) {
  console.log(data)
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Cronos! 👏🏻</Heading>
        <Text size="sm">
          Precisamos de algumas informações importantes para podermos criar o
          seu perfil! E não se preocupe, você poderá editar todas essas
          informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text as="strong" size="sm">
            Nome de usuário
          </Text>
          <TextInput
            prefix="oabma/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {/* Dispara um Toast de erro caso houver */}
          {!!errors.username &&
            Toast({
              type: 'error',
              message: String(errors.username.message),
            })}
        </label>

        <label>
          <Text as="strong" size="sm">
            Nome de completo
          </Text>
          <TextInput placeholder="Seu nome" {...register('name')} />

          {/* Dispara um Toast de erro caso houver */}
          {!!errors.name &&
            Toast({
              type: 'error',
              message: String(errors.name.message),
            })}
        </label>

        {isSubmitting ? (
          <p>Carregando...</p>
        ) : (
          <Button type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        )}
      </Form>
    </Container>
  )
}
