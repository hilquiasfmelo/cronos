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

  return res.json({ blockedWeekDays })
}
