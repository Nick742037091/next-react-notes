import './style.css'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="main flex">
          <Sidebar />
          <section className="flex-1 flex flex-col">
            <Header />
            <div className="flex-1 note-viewer">{children}</div>
          </section>
        </div>
      </body>
    </html>
  )
}
