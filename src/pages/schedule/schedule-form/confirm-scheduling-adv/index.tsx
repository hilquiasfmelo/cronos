import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Toast } from '@/lib/react-toastify/toasts'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { CalendarBlank, CalendarX, Check, Clock, Spinner } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfirmForm, FormActions, FormHeader } from './styles'

const confirmSchedulingFormSchema = z.object({
  number_oab: z
    .string()
    .regex(/^([0-9]+)$/, {
      message: 'Número da OAB inválido, permitido somente números.',
    })
    .max(6, { message: 'Permitido até 6 dígitos.' }),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Insira um endereço de e-mail válido.' }),
  contact: z.string().regex(/^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*)$/, {
    message: 'Insira um número de telefone válido.',
  }),
})

type ConfirmSchedulingFormData = z.infer<typeof confirmSchedulingFormSchema>

interface ConfirmSchedulingAdvProps {
  schedulingDate: Date
  onCancelOrBackConfirmation: () => void
}

export function ConfirmSchedulingAdv({
  schedulingDate,
  onCancelOrBackConfirmation,
}: ConfirmSchedulingAdvProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmSchedulingFormData>({
    resolver: zodResolver(confirmSchedulingFormSchema),
  })

  async function handleSchedulingAdv(data: ConfirmSchedulingFormData) {
    console.log(data)
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

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          onClick={onCancelOrBackConfirmation}
        >
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
