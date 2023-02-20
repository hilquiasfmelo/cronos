import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year && !month) {
    return res
      .status(400)
      .json({ message: 'Nenhum ano ou mês foi especificado.' })
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

  // Busca os dias da semana que o usuário tem disponibilidade
  const availableWeekDays = await prisma.userTimeAppointments.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  // Busca os dias da semana que o usuário não tem disponibilidade
  const blockedWeekDays = Array.from({ length: 7 }, (_, i) => i).filter(
    (weekDay) => {
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    },
  )

  // Retorna todos os dias que estão com todos os horários agendados
  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTA.time_end_in_minutes - UTA.time_start_in_minutes) / 60) AS size
    FROM schedulings S

    LEFT JOIN user_time_appointments UTA
      ON UTA.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.date),
      ((UTA.time_end_in_minutes - UTA.time_start_in_minutes) / 60)

    HAVING amount >= size
  `

  const scheduledDates = blockedDatesRaw.map((item) => item.date)

  return res.json({ blockedWeekDays, scheduledDates })
}
