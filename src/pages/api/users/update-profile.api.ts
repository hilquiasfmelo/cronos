import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { unstable_getServerSession as getServerSession } from 'next-auth'

const updateProfileBodySchema = z.object({
  username: z.string(),
  name: z.string(),
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  // Obtém as informações do usuário logado
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).json({
      message: 'Acesso não permitido, você precisa estar logado.',
    })
  }

  const { username, name, bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      username,
      name,
      bio,
    },
  })

  return res.status(204).end()
}
