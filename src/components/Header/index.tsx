import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Calendar, SignIn, SignOut } from 'phosphor-react'
import { Toast } from '@/lib/react-toastify/toasts'

import { Text } from '../Text'
import { Button } from '../Button'

import { Container, Content, SchedulesContainer, SessionStatus } from './styles'

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
      <Content as="a" href="/">
        <Image src={logoCronos} alt="logo cronos" height={50} quality={100} />
        <Text size="sm">CRONOS</Text>
      </Content>

      {isSignedIn && (
        <SchedulesContainer>
          <Calendar style={{ width: '1.5rem', height: '1.5rem' }} />
          <Text as="a" href="/schedule/schedules" target="_blank">
            Agendamentos
          </Text>
        </SchedulesContainer>
      )}

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
