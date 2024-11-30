import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { content, allowReactions, allowPublicComments, allowProfessionalComments, telegramId } = req.body

      const user = await prisma.user.upsert({
        where: { telegramId },
        update: {},
        create: { telegramId },
      })

      const vent = await prisma.vent.create({
        data: {
          content,
          allowReactions,
          allowPublicComments,
          allowProfessionalComments,
          author: { connect: { id: user.id } },
        },
      })

      res.status(200).json(vent)
    } catch (error) {
      res.status(500).json({ error: 'Error submitting vent' })
      console.log(error)
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

