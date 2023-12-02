import Image from 'next/image'
import { Card } from '@/design-system/ui/Card'
import Typography from '@/design-system/ui/Typography'
import Login from './Login'

export default function LoginPage() {
  return (
    <section className="grid h-screen grid-cols-1">
      <div className="m-auto">
        <Typography variant="h1" className="text-center">
          Micro1 Kanban
        </Typography>
      </div>
      <div className="w-full">
        <div className="m-auto flex max-w-md">
          <Card className="w-full">
            <div className="p-8">
              <Login />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
