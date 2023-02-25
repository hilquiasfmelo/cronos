import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { API } from '@/lib/axios'
import { Toast } from '@/lib/react-toastify/toasts'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, CalendarX, Check, Clock, Spinner } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ConfirmForm,
  FormActions,
  FormHeader,
  SeparationContainer,
} from './styles'

const confirmSchedulingFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Insira um endereço de e-mail válido.' }),
  number_oab: z
    .string()
    .regex(/^([0-9]+)$/, {
      message: 'Número da OAB inválido, permitido somente números.',
    })
    .max(6, { message: 'Permitido até 6 dígitos.' }),
  contact: z.string().regex(/^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*)$/, {
    message: 'Insira um número de telefone válido.',
  }),
  room: z.string(),
  atendiment: z.string(),
})

type ConfirmSchedulingFormData = z.infer<typeof confirmSchedulingFormSchema>

interface ConfirmSchedulingAdvProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
  toBackCalendarScheduling: () => void
}

export function ConfirmSchedulingAdv({
  schedulingDate,
  onCancelConfirmation,
  toBackCalendarScheduling,
}: ConfirmSchedulingAdvProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmSchedulingFormData>({
    resolver: zodResolver(confirmSchedulingFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleSchedulingAdv(data: ConfirmSchedulingFormData) {
    const { name, email, number_oab, contact, room, atendiment } = data

    try {
      await API.post(`/users/${username}/schedule`, {
        name,
        email,
        number_oab,
        contact,
        room,
        atendiment,
        date: schedulingDate,
      })

      Toast({
        type: 'success',
        message: 'Agendamento realizado com sucesso!',
      })

      setTimeout(async () => {
        toBackCalendarScheduling()
      }, 1500)
    } catch (err) {
      console.log(err)
      if (err instanceof AxiosError && err?.response?.data?.message) {
        Toast({
          type: 'error',
          message: String(err.response.data.message),
        })
      }

      Toast({
        type: 'error',
        message: 'Não foi possível realizar o agendamento, tente novamente!',
      })
    }
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleSchedulingAdv)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo do Advogado</Text>
        <TextInput placeholder="John Doe" {...register('name')} />

        {errors.name &&
          Toast({
            type: 'error',
            message: String(errors.name.message),
          })}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@gmail.com"
          {...register('email')}
        />

        {errors.email &&
          Toast({
            type: 'error',
            message: String(errors.email.message),
          })}
      </label>

      <SeparationContainer>
        <label>
          <Text size="sm">Número de inscrição da OAB</Text>
          <TextInput
            type="number"
            placeholder="OAB"
            {...register('number_oab')}
          />

          {errors.number_oab &&
            Toast({
              type: 'error',
              message: String(errors.number_oab.message),
            })}
        </label>

        <label>
          <Text size="sm">Número do WhatsApp</Text>
          <TextInput
            type="tel"
            placeholder="(98)99988-7766"
            {...register('contact')}
          />

          {errors.contact &&
            Toast({
              type: 'error',
              message: String(errors.contact.message),
            })}
        </label>
      </SeparationContainer>

      <SeparationContainer>
        <label>
          <Text size="sm">Definir Sala</Text>
          <select {...register('room')}>
            <option defaultValue="">Selecione...</option>
            <option value="1">Sala 01</option>
            <option value="2">Sala 02</option>
            <option value="3">Sala 03</option>
            <option value="4">Sala 04</option>
          </select>
        </label>

        <label>
          <Text size="sm">Tipo de Atendimento</Text>
          <select {...register('atendiment')}>
            <option value="atendimento">Selecione...</option>
            <option value="atendimento">Atendimento - 02 Horas</option>
            <option value="audiencia">Audiência - 03 Horas</option>
          </select>
        </label>
      </SeparationContainer>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          <CalendarX style={{ width: '1.5rem', height: '1.5rem' }} />
          Cancelar
        </Button>

        {isSubmitting ? (
          <Button variant="spinner" disabled>
            <Spinner />
          </Button>
        ) : (
          <Button type="submit">
            <Check style={{ width: '1.5rem', height: '1.5rem' }} />
            Agendar
          </Button>
        )}
      </FormActions>
    </ConfirmForm>
  )
}
