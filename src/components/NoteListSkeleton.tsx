export default function NoteListSkeleton() {
  return (
    <div>
      <ul className="notes-list skeleton-container">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="v-stack">
            <div
              className="sidebar-note-list-item skeleton"
              style={{ height: '5em' }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
