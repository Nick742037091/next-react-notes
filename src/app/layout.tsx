import './style.css'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { getProfile } from '@/lib/dal'
import { Toaster } from '@/components/shadcn/toaster'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const profile = await getProfile()
  return (
    <html lang="en">
      <body className="h-[100vh] flex flex-col relative">
        {profile ? <Header /> : null}
        <div className="flex-1 flex ">
          {profile ? <Sidebar /> : null}
          <div className="flex-1">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
