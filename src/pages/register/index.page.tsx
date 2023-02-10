import { useEffect } from 'react'
import { ArrowRight, Spinner } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'

import { Container, Form, Header } from './styles'
import { Toast } from '@/lib/react-toastify/toasts'

import { API } from '@/lib/axios'
import { HeaderMain } from '@/components/Header'

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

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  /**
   * Se existir a variável na URL, isso renderiza a página e busca o seu valor,
   * e se mesma mudar, é adicionado o seu valor ao campo username.
   */
  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await API.post('/users', {
        username: data.username,
        name: data.name,
      })

      Toast({
        type: 'success',
        message:
          'Seu usuário foi criado com sucesso. É um prazer ter você aqui!',
      })

      await router.push(`/register/connect-calendar`)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        Toast({
          type: 'warn',
          message: String(err.response.data.message),
        })

        setTimeout(async () => {
          await router.push(`/register/connect-calendar`)
        }, 1000)

        return
      }

      Toast({
        type: 'error',
        message: 'Não foi possível cadastrar o usuário, tente novamente!',
      })
    }
  }

  return (
    <>
      <HeaderMain />

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
            {errors.username &&
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
            {errors.name &&
              Toast({
                type: 'error',
                message: String(errors.name.message),
              })}
          </label>

          {isSubmitting ? (
            <Button variant="spinner" disabled>
              <Spinner />
            </Button>
          ) : (
            <Button type="submit">
              Próximo passo
              <ArrowRight />
            </Button>
          )}
        </Form>
      </Container>
    </>
  )
}
