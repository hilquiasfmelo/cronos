import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SignIn, SignOut } from 'phosphor-react'

import { Text } from '../Text'
import { Button } from '../Button'
import { Toast } from '@/lib/react-toastify/toasts'

import { Container, Content, SessionStatus } from './styles'

import logoCronos from '../../assets/cronos.svg'

export function HeaderMain() {
  const session = useSession()
  const router = useRouter()

  const isSignedIn = session.status === 'authenticated'

  async function handleLogoutUser() {
    signOut({
      redirect: false,
    }).then(async () => {
      await router.push('/')

      Toast({
        type: 'info',
        message: 'Você foi deslogado, acesse quando quiser 🚀',
      })
    })
  }

  return (
    <Container>
      <Content>
        <Image src={logoCronos} alt="logo cronos" height={50} quality={100} />
        <Text size="sm">CRONOS</Text>
      </Content>

      {isSignedIn ? (
        <SessionStatus>
          <Text
            as="strong"
            size="sm"
          >{`Olá, ${session.data?.user?.name}`}</Text>

          <Button onClick={handleLogoutUser}>
            <SignOut />
            Sair
          </Button>
        </SessionStatus>
      ) : (
        <SessionStatus>
          <Button
            onClick={async () => {
              await router.push('/')
            }}
          >
            <SignIn />
            Iniciar Sessão
          </Button>
        </SessionStatus>
      )}
    </Container>
  )
}
