import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import dayjs from 'dayjs'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

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

  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    number_oab: z.string(),
    contact: z.string(),
    room: z.string(),
    atendiment: z.string(),
    date: z.string().datetime(),
  })

  const { name, email, number_oab, contact, room, atendiment, date } =
    createSchedulingBody.parse(req.body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: 'Essa data já passou, tente outra.',
    })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({
      message: 'Já existe um agendamento para essa data.',
    })
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      number_oab,
      contact,
      room,
      atendiment,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return res.status(201).end()
}
