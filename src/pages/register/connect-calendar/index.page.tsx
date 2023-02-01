import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Plugs, PlugsConnected } from 'phosphor-react'

import { Button } from '@/components/Button'
import { HeaderMain } from '@/components/Header'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const isSignedIn = session.status === 'authenticated'
  const hasAuthError = !!router.query.error

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-appointments')
  }

  return (
    <>
      <HeaderMain />

      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda com o Google! </Heading>
          <Text size="sm">
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e livres como também as novas reservas à medida em que são
            agendadas.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <PlugsConnected />
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                variant="secondary"
                onClick={handleConnectCalendar}
              >
                Conectar
                <Plugs />
              </Button>
            )}
          </ConnectItem>

          <Button
            type="submit"
            disabled={!isSignedIn}
            onClick={handleNavigateToNextStep}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>

        {hasAuthError && (
          <AuthError size="md">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}
      </Container>
    </>
  )
}
