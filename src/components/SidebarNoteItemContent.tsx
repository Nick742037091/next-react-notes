'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

export const getQueryPage = () => {
  const currentQuery =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()
  const page = currentQuery.get('page')
  const queryString = page ? `?page=${page}` : ''
  return queryString
}

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren
}: {
  id: string
  title: string
  children: React.ReactNode
  expandedChildren: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = pathname?.split('/')[2] || null

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId

  // Animate after title is edited.
  const itemRef = useRef<HTMLDivElement>(null)
  const prevTitleRef = useRef(title)

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title
      itemRef.current?.classList.add('flash')
    }
  }, [title])

  const handleOpenNote = () => {
    const sidebarToggle = document.getElementById(
      'sidebar-toggle'
    ) as HTMLInputElement | null
    if (sidebarToggle) {
      sidebarToggle.checked = true
    }
    router.push(`/note/${id}${getQueryPage()}`)
  }

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList.remove('flash')
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : ''
      ].join(' ')}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
            ? 'var(--tertiary-blue)'
            : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent'
        }}
        onClick={handleOpenNote}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
      >
        {isExpanded ? (
          <MdArrowUpward size={24} />
        ) : (
          <MdArrowDownward size={24} />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
}
