import { useMemo, useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { getWeekDays } from '@/utils/get-week-days'
import { API } from '@/lib/axios'

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

interface CalendarWeekProps {
  week: number
  daysInWeek: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeksProps = CalendarWeekProps[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  scheduledDates: number[]
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()

  const username = String(router.query.username)

  const shortWeekDays = getWeekDays({ short: true })

  /** Manipulando as datas e horários */
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  // Chamada a API usando o React Query
  const { data: blockedDates } = useQuery<BlockedDates>(
    [
      'blocked-dates',
      currentDate.get('year'),
      String(currentDate.get('month') + 1).padStart(2, '0'),
    ],
    async () => {
      const response = await API.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: String(currentDate.get('month') + 1).padStart(2, '0'),
        },
      })

      return response.data
    },
  )

  /** Buscando todo os dias e semanas do mês atual */
  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDayAtMonth = currentDate.get('day')

    // Busca os dias do mês anterior para preencher o array de uma semana
    const previousDaysAtMonthFillArray = Array.from({
      length: firstWeekDayAtMonth,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    // Ex: 2
    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    // Ex: Sexta-feira
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    // Busca os dias do próximo mês para preencher o array de uma semana
    const nextDaysAtMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    /**
     * Retorna os dias da semana do mês que passou para completar os 7 dias da semana atual
     * Retorna os dias da semana atual
     * Retorna os dias da semana do próximo mês para completar os 7 dias da semana atual
     */
    const calendarDays = [
      ...previousDaysAtMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')) ||
            blockedDates.scheduledDates.includes(date.get('date')),
        }
      }),
      ...nextDaysAtMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    // Retorna as semanas do mês atual separadas
    const calendarWeeks = calendarDays.reduce<CalendarWeeksProps>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            daysInWeek: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])
  /** Fim das manipulações */

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return <th key={weekDay}>{weekDay}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, daysInWeek }) => {
            return (
              <tr key={week}>
                {daysInWeek.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
