import { Button } from '@/components/ui/button'

interface MainMenuProps {
  setView: (view: string) => void
}

export default function MainMenu({ setView }: MainMenuProps) {
  return (
    <div className="space-y-4">
      <Button onClick={() => setView('venting')} className="w-full">Start Venting</Button>
      <Button onClick={() => setView('profile')} className="w-full">My Profile</Button>
      <Button onClick={() => setView('rules')} className="w-full">Rules and Regulations</Button>
      <Button onClick={() => setView('help')} className="w-full">Help</Button>
      <Button onClick={() => setView('about')} className="w-full">About Alenelachehu</Button>
    </div>
  )
}

