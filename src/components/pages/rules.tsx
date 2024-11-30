import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Rules() {
  const rules = [
    "No personal attacks - Users are not allowed to directly attack or insult other users. Criticism should be constructive and Discriminatory, derogatory, or hateful language towards the ventee is strictly prohibited.",
    "No explicit content - Graphic, violent, or sexually explicit content is not allowed. Users also cannot post about or encourage any illegal activities.",
    "No spam or any kinds of promotion",
    "Moderator discretion - Moderators have the right to remove any content or comments they deem inappropriate or in violation of the rules.",
    "Suspension/banning - Repeated violations can result in temporary suspension or permanent banning from the platform.",
    "Reporting system – Anyone can report any content and comments if it's a violation of the rules and regulations.",
    "Data privacy - User data and information is protected and handled securely.",
    "Appeal process - Users should have the ability to appeal content removal or account suspensions.",
    "Respect privacy - Revealing another user's personal information without consent is strictly forbidden.",
    "If deemed necessary, Alenelachehu may use vented contents for different positive impact creations while keeping its anonymity."
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rules and Regulations</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

