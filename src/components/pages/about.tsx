import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Alenelachehu Charitable Organization</CardTitle>
          <CardDescription>Established on May, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
          &quot;አለንላችሁ&quot; Alenelachehu Charitable Organization (ACO) is a non-profit organization, the first and the only one of its kind in Ethiopia that works purely on mental health in creating awareness and helping those facing mental health challenges.
          </p>
          <h3 className="text-lg font-semibold mb-2">Mission</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Provide accessible and compassionate support for those struggling with mental health challenges, while also raising awareness and reducing stigma surrounding mental illness.</li>
            <li>Improve mental health and well-being of individuals, families and communities through a multifaceted approach that combines education, advocacy and support.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Vision</h3>
          <p className="mb-4">
            Creating an Ethiopia where mental health is not stigmatized and all individuals have access to resources and support that promote well-being, resilience and connectedness.
          </p>
          <h3 className="text-lg font-semibold mb-2">Goals</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Reducing the stigma about mental health</li>
            <li>Minimizing suicide rates in Ethiopia</li>
            <li>Support services to individuals and families affected by mental illness</li>
            <li>Collaborating with other organizations and stakeholders to address mental health challenges at the community and national levels</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>Ethiopia, Addis Ababa, Megenagna, Salam Tower 11th floor</p>
          <p>Phone: +251965579192 or +251919186182</p>
          <p>Email: Alenelacehuco@gmail.com</p>
          <div className="mt-4 space-y-2">
            <a href="https://www.Alenelachehu.org" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
              Website <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a href="https://t.me/Alenelachehu" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
              Telegram <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/company/alenelachehu-charitable-organization/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
              LinkedIn <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a href="https://chat.whatsapp.com/KzPWHuG4m3LG7DB7uXVdKZ" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
              WhatsApp <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100081094233970" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
              Facebook <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

