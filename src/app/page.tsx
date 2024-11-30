"use client"
import { useEffect, useState } from 'react'
import Head from 'next/head'
import MainMenu from '@/components/pages/mainmenu'
import VentingSpace from '@/components/pages/ventingSpace'
import VentList from '@/components/pages/ventList'
import Profile from '@/components/pages/profile'
import Rules from '@/components/pages/rules'
import Help from '@/components/pages/help'
import About from '@/components/pages/about'
import { Button } from '@/components/ui/button'

interface TelegramUser {
  id: number
}
export default function Home() {
  const [currentView, setCurrentView] = useState('menu')
  const [user, setUser] = useState<TelegramUser | null>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tgWebApp = window.Telegram?.WebApp
    if (tgWebApp) {
      tgWebApp.ready()
      setUser(tgWebApp.initDataUnsafe.user)
    }
  }, [user])

  const renderView = () => {
    switch (currentView) {
      case 'venting':
        return <VentingSpace />
      case 'vents':
        return <VentList />
      case 'profile':
        return <Profile />
      case 'rules':
        return <Rules />
      case 'help':
        return <Help />
      case 'about':
        return <About />
      default:
        return <MainMenu setView={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Alenelachehu Venting Platform</title>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Alenelachehu Venting Platform</h1>
        {renderView()}
        {currentView !== 'menu' && (
          <Button onClick={() => setCurrentView('menu')} className="mt-4">
            Back to Menu
          </Button>
        )}
      </main>
    </div>
  )
}