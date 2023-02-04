import { Button } from '@/components/Button'
import { CheckBox } from '@/components/CheckBox'
import { HeaderMain } from '@/components/Header'
import { Heading } from '@/components/Heading'
import { MultiStep } from '@/components/MultiStep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Toast } from '@/lib/react-toastify/toasts'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Spinner } from 'phosphor-react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'

const timeAppointmentsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    }),
})

type TimeAppointmentsFormData = z.infer<typeof timeAppointmentsFormSchema>

export default function TimeAppointments() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeAppointmentsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeAppointments(data: TimeAppointmentsFormData) {
    console.log(data)
  }

  return (
    <>
      <HeaderMain />
      <Container>
        <Header>
          <Heading as="strong">Quase lá!</Heading>
          <Text size="sm">
            Defina o intervalo de horários que você está disponível em cada dia
            da semana. Já existe um intervalo definido, caso seja o seu, basta
            somente prosseguir.
          </Text>

          <MultiStep size={4} currentStep={3} />
        </Header>

        <IntervalBox
          as="form"
          onSubmit={handleSubmit(handleSetTimeAppointments)}
        >
          <IntervalContainer>
            {fields.map((field, index) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <CheckBox
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                            checked={field.value}
                          />
                        )
                      }}
                    />
                    <Text>{weekDays[field.weekDay]}</Text>
                  </IntervalDay>

                  <IntervalInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.startTime`)}
                      disabled={intervals[index].enabled === false}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.endTime`)}
                      disabled={intervals[index].enabled === false}
                    />
                  </IntervalInputs>
                </IntervalItem>
              )
            })}
          </IntervalContainer>

          {/* Dispara um erro caso houver */}
          {errors.intervals &&
            Toast({
              type: 'error',
              message: String(errors.intervals.message),
            })}

          {isSubmitting ? (
            <Button variant="spinner" disabled>
              <Spinner />
            </Button>
          ) : (
            <Button type="submit">
              Próximo passo
              <ArrowRight />
            </Button>
          )}
        </IntervalBox>
      </Container>
    </>
  )
}
