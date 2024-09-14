import './style.css'
import './globals.css'
import Header from '@/components/Header'
import { Toaster } from '@/components/shadcn/toaster'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
