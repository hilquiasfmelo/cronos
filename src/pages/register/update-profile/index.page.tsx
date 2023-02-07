import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { HeaderMain } from '@/components/Header'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { TextInput } from '@/components/TextInput'
import { Toast } from '@/lib/react-toastify/toasts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Check, Spinner } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { unstable_getServerSession as getServerSession } from 'next-auth'
import { z } from 'zod'

import { Container, Header } from '../styles'
import { AvatarContainer, FormAnnotation, ProfileBox } from './styles'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSideProps } from 'next'
import { API } from '@/lib/axios'
import { AxiosError } from 'axios'
import router from 'next/router'

const updateProfileFormSchema = z.object({
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
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const session = useSession()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    try {
      await API.put('/users/update-profile', {
        username: data.username,
        name: data.name,
        bio: data.bio,
      })

      Toast({
        type: 'success',
        message: '✨ Parabéns! Processo de cadastro finalizado.',
      })

      await router.push(`/schedule/${session.data?.user.username}`)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        Toast({
          type: 'error',
          message: String(err.response.data.message),
        })

        setTimeout(async () => {
          await router.push(`/`)
        }, 1500)

        return
      }

      Toast({
        type: 'error',
        message: 'Erro inesperado, tente novamente!',
      })
    }
  }

  // Busca os dados do Banco de Dados e se houver ele seta esses valores nos inputs por padrão
  useEffect(() => {
    if (session.data?.user.username && session.data.user.name) {
      setValue('username', session.data.user.username)
      setValue('name', session.data.user.name)
    }
  }, [setValue, session.data?.user.username, session.data?.user.name])

  return (
    <>
      <HeaderMain />
      <Container>
        <Header>
          <Heading as="strong">Resumo sobre você!</Heading>
          <Text size="sm">
            Por último, você deve conferir se está tudo correto com seus dados,
            caso queira mudar sinta-se a vontade.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <AvatarContainer>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </AvatarContainer>

          <label>
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

            <TextInput placeholder="Seu nome" {...register('name')} />

            {/* Dispara um Toast de erro caso houver */}
            {!!errors.name &&
              Toast({
                type: 'error',
                message: String(errors.name.message),
              })}

            <TextArea {...register('bio')} />

            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          {isSubmitting ? (
            <Button variant="spinner" disabled>
              <Spinner />
            </Button>
          ) : (
            <Button type="submit">
              Finalizar
              <Check />
            </Button>
          )}
        </ProfileBox>
      </Container>
    </>
  )
}

// Busca os dados da sessão do usuário já no primeiro carregamento da página
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
