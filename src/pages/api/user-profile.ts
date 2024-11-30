import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { telegramId } = req.query

  if (!telegramId || typeof telegramId !== 'string') {
    return res.status(400).json({ error: 'Invalid telegramId' })
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { telegramId },
      })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user profile' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { nickname, age, gender, nationality } = req.body

      const updatedUser = await prisma.user.update({
        where: { telegramId },
        data: { nickname, age, gender, nationality },
      })

      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({ error: 'Error updating user profile' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

