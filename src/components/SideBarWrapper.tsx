import Sidebar from './Sidebar'

export default function SideBarWrapper({
  children,
  pagePath,
  page
}: {
  children: React.ReactNode
  pagePath: string
  page: number
}) {
  return (
    <div className="h-[100vh] flex">
      <Sidebar page={page} pagePath={pagePath} />
      <div className="flex-1">{children}</div>
    </div>
  )
}
