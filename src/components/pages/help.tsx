import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export default function Help() {
  const [supportType, setSupportType] = useState<'professional' | 'group' | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual submission logic
    toast({
      title: 'Support request submitted',
      description: 'We will get back to you soon.',
    })
    setSupportType(null)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Choose the type of support you need</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={supportType || ''} onValueChange={(value) => setSupportType(value as 'professional' | 'group')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional">Professional Support</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group">Support Group</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {supportType && (
        <Card>
          <CardHeader>
            <CardTitle>{supportType === 'professional' ? 'Request Professional Support' : 'Join a Support Group'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

