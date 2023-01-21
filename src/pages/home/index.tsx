import { Heading, Text } from '@oabma-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="lg">
          Conecte seu calendário e permita que todos os advogados marquem
          agendamentos das salas para <strong>Audiência</strong> e
          <strong>Atendimento</strong>
        </Text>
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
