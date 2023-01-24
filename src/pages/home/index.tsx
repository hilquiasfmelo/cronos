import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'

import previewImage from '../../assets/app-preview.png'

import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="lg">
          Conecte seu calendário e permita que todos os advogados marquem
          agendamentos das salas para <strong>Audiência</strong> e {''}
          <strong>Atendimento</strong>
        </Text>

        {/* Add component is here */}
        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário com a logo da OAB"
        />
      </Preview>
    </Container>
  )
}
