import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { ventId, content, isPublic, isProfessional, telegramId } = req.body

      const vent = await prisma.vent.findUnique({
        where: { id: ventId },
      })

      if (!vent) {
        return res.status(404).json({ error: 'Vent not found' })
      }

      if (isPublic && !vent.allowPublicComments) {
        return res.status(403).json({ error: 'Public comments are not allowed on this vent' })
      }

      if (isProfessional && !vent.allowProfessionalComments) {
        return res.status(403).json({ error: 'Professional comments are not allowed on this vent' })
      }

      const user = await prisma.user.findUnique({
        where: { telegramId },
      })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          isPublic,
          isProfessional,
          vent: { connect: { id: ventId } },
        },
      })

      res.status(201).json(comment)
    } catch (error) {
      res.status(500).json({ error: 'Error adding comment' })
      console.log(error)
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

