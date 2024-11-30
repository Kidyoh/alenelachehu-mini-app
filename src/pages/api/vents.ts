import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { page = '1', limit = '10' } = req.query
      const pageNumber = parseInt(page as string, 10)
      const limitNumber = parseInt(limit as string, 10)
      const skip = (pageNumber - 1) * limitNumber

      const vents = await prisma.vent.findMany({
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { nickname: true },
          },
          comments: {
            where: {
              OR: [
                { isPublic: true },
                { isProfessional: true },
              ],
            },
            select: {
              id: true,
              content: true,
              createdAt: true,
              isPublic: true,
              isProfessional: true,
            },
          },
        },
      })

      const totalVents = await prisma.vent.count()

      res.status(200).json({
        vents,
        totalPages: Math.ceil(totalVents / limitNumber),
        currentPage: pageNumber,
      })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching vents' })
      console.log(error)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

