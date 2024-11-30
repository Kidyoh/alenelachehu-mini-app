import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface User {
  nickname: string | null
  age: number | null
  gender: string | null
  nationality: string | null
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const telegramId = (window as any).Telegram.WebApp.initDataUnsafe.user.id.toString()
        const response = await fetch(`/api/user-profile?telegramId=${telegramId}`)
        if (!response.ok) throw new Error('Failed to fetch profile')
        const data = await response.json()
        setUser(data)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch profile. Please try again.',
          variant: 'destructive',
        })
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const telegramId = (window as any).Telegram.WebApp.initDataUnsafe.user.id.toString()
      const response = await fetch(`/api/user-profile?telegramId=${telegramId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (!response.ok) throw new Error('Failed to update profile')
      setIsEditing(false)
      toast({
        title: 'Success',
        description: 'Profile updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            value={user.nickname || ''}
            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={user.age || ''}
            onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={user.gender || ''}
            onValueChange={(value) => setUser({ ...user, gender: value })}
            disabled={!isEditing}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={user.nationality || ''}
            onChange={(e) => setUser({ ...user, nationality: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </form>
    </div>
  )
}

