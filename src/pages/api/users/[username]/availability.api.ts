import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const date = req.query.date

  if (!date) {
    return res.status(400).json({ message: 'Nenhuma data foi fornecida.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({
      message: 'Esse usuário não está cadastrado.',
    })
  }

  const referenceDate = dayjs(String(date))

  console.log(referenceDate)

  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ possibleTimes: [], availability: [] })
  }

  // Busca os horários disponíveis do usuário para ele agendar
  const userAvailability = await prisma.userTimeAppointments.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availability: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const starHour = time_start_in_minutes / 60 // 8
  const endHour = time_end_in_minutes / 60 // 18

  // Cria um array com os horários disponíveis para ele agendar
  const possibleTimes = Array.from({
    length: endHour - starHour,
  }).map((_, i) => {
    return starHour + i
  })

  // Busca os horários que não estão disponíveis no intervalo de agendamentos
  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        // Seja maior ou igual á
        gte: referenceDate.set('hour', starHour).toDate(),
        // Seja menor ou igual á
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  // Busca somente os horários disponíveis no intervalo de agendamento do usuário
  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )
  })

  return res.json({
    possibleTimes,
    availableTimes,
  })
}
