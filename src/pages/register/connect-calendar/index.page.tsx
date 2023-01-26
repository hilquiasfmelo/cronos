import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Plugs } from 'phosphor-react'

import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

async function handleConnectCalendar() {
  await signIn('google')
}

export default function ConnectCalendar() {
  const session = useSession()

  return (
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
          <Button variant="secondary" size="sm" onClick={handleConnectCalendar}>
            Conectar
            <Plugs />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>

      <Text>{JSON.stringify(session.data?.user?.name)}</Text>
      <Text>{JSON.stringify(session.status)}</Text>
    </Container>
  )
}
