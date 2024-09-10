import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarNoteList from '@/components/SidebarNoteList'
import Image from 'next/image'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from './NoteListSkeleton'
import logo from '@/assets/icon/logo.svg'

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src={logo}
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
