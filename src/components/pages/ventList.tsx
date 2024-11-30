import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface Vent {
  id: number
  content: string
  createdAt: string
  allowReactions: boolean
  allowPublicComments: boolean
  allowProfessionalComments: boolean
  author: {
    nickname: string
  }
  comments: Array<{
    id: number
    content: string
    createdAt: string
    isPublic: boolean
    isProfessional: boolean
  }>
}

export default function VentList() {
  const [vents, setVents] = useState<Vent[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchVents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/vents?page=${page}&limit=10`)
      if (!response.ok) {
        throw new Error('Failed to fetch vents')
      }
      const data = await response.json()
      setVents(data.vents)
      setTotalPages(data.totalPages)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch vents. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVents()
  }, [page])

  return (
    <div className="space-y-4">
      {vents.map((vent) => (
        <Card key={vent.id}>
          <CardHeader>
            <CardTitle>{vent.author.nickname || 'Anonymous'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{vent.content}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              {new Date(vent.createdAt).toLocaleString()}
            </p>
          </CardFooter>
        </Card>
      ))}
      <div className="flex justify-between">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

