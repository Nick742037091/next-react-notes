import NoteEditor from '@/components/NoteEditor'
import SideBarWrapper from '@/components/SideBarWrapper'
export default async function EditPage({
  searchParams
}: {
  searchParams: { page: string }
}) {
  const page = parseInt(searchParams.page) || 1
  return (
    <SideBarWrapper page={page} pagePath={`/note/edit`}>
      <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />
    </SideBarWrapper>
  )
}
