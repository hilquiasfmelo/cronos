import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { CalendarBlank, CalendarX, Check, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormHeader } from './styles'

export function ConfirmSchedulingAdv() {
  return (
    <ConfirmForm as="form">
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          08:00h às 11:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Número de inscrição da OAB</Text>
        <TextInput type="number" placeholder="OAB" />
      </label>

      <label>
        <Text size="sm">Nome completo do Advogado</Text>
        <TextInput placeholder="Digite o nome completo" />
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="example@gmail.com" />
      </label>

      <label>
        <Text size="sm">Número do WhatsApp</Text>
        <TextInput type="tel" placeholder="(DDD) 9 9999-9999" />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          <CalendarX style={{ width: '1.5rem', height: '1.5rem' }} />
          Cancelar
        </Button>
        <Button type="submit">
          <Check style={{ width: '1.5rem', height: '1.5rem' }} />
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
