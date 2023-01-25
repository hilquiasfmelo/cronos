import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { setCookie } from 'nookies'

const userBodySchema = z.object({
  username: z.string().min(3),
  name: z.string().min(3),
})

export default async function handleCreateUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = userBodySchema.parse(req.body)

  const userExist = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (userExist) {
    // Set o ID do usuário nos cookies
    setCookie({ res }, '@cronos:userId', userExist.id, {
      maxAge: 60 * 60 * 24, // 1 day
      // Todas as rotas poderão acessar os cookies
      path: '/',
    })

    return res.status(400).json({
      message: 'Usuário já cadastrado, conecte-se com a sua conta do Google',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  // Set o ID do usuário nos cookies
  setCookie({ res }, '@cronos:userId', user.id, {
    maxAge: 60 * 60 * 24, // 1 day
    // Todas as rotas poderão acessar os cookies
    path: '/',
  })

  return res.status(201).json(user)
}
