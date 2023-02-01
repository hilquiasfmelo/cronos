import { Button } from '@/components/Button'
import { CheckBox } from '@/components/CheckBox'
import { HeaderMain } from '@/components/Header'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'

export default function TimeAppointments() {
  return (
    <>
      <HeaderMain />
      <Container>
        <Header>
          <Heading as="strong">Quase lá!</Heading>
          <Text size="sm">
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>

          <MultiStep size={4} currentStep={3} />
        </Header>

        <IntervalBox as="form">
          <IntervalContainer>
            <IntervalItem>
              <IntervalDay>
                <CheckBox />
                <Text>Segunda-feira</Text>
              </IntervalDay>

              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <CheckBox />
                <Text>Terça-feira</Text>
              </IntervalDay>

              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>
          </IntervalContainer>

          <Button type="submit">
            Próxima passo
            <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  )
}
