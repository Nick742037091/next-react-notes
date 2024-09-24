import SideBarWrapper from '@/components/SideBarWrapper'

export default function NotePage({
  searchParams
}: {
  searchParams: { page: string }
}) {
  const page = parseInt(searchParams.page) || 1
  return (
    <SideBarWrapper page={page} pagePath="/note">
      <div className="p-[20px] text-[28px]">
        Click a note on the left to view something! 🥺
      </div>
    </SideBarWrapper>
  )
}
