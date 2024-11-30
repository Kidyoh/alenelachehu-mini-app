import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'

export default function VentingSpace() {
  const [ventContent, setVentContent] = useState('')
  const [allowReactions, setAllowReactions] = useState(false)
  const [allowPublicComments, setAllowPublicComments] = useState(false)
  const [allowProfessionalComments, setAllowProfessionalComments] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-vent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: ventContent,
          allowReactions,
          allowPublicComments,
          allowProfessionalComments,
          telegramId: (window as any).Telegram.WebApp.initDataUnsafe.user.id.toString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit vent')
      }

      setVentContent('')
      toast({
        title: 'Vent submitted successfully',
        description: 'Your vent has been posted.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit vent. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={ventContent}
        onChange={(e) => setVentContent(e.target.value)}
        placeholder="Start venting here..."
        className="h-40"
      />
      <div className="flex items-center space-x-2">
        <Switch
          checked={allowReactions}
          onCheckedChange={setAllowReactions}
          id="allow-reactions"
        />
        <label htmlFor="allow-reactions">Allow reactions</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={allowPublicComments}
          onCheckedChange={setAllowPublicComments}
          id="allow-public-comments"
        />
        <label htmlFor="allow-public-comments">Allow public comments</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={allowProfessionalComments}
          onCheckedChange={setAllowProfessionalComments}
          id="allow-professional-comments"
        />
        <label htmlFor="allow-professional-comments">Allow professional comments</label>
      </div>
      <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Vent'}
      </Button>
    </div>
  )
}

