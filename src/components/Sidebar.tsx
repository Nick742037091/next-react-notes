import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarNoteList from '@/components/SidebarNoteList'
import Image from 'next/image'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from './NoteListSkeleton'
import logo from '@/assets/icon/logo.svg'
import { ScrollArea } from './shadcn/scroll-area'
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md'
import { Button } from './shadcn/button'
import { getNotesByPage } from '@/app/actions'

export default async function Sidebar({
  page,
  pagePath
}: {
  page: number
  pagePath: string
}) {
  const pageSize = 10
  const { list, count } = await getNotesByPage(page, 10)
  const totalPage = Math.ceil(count / pageSize)
  return (
    <>
      <section className="col sidebar h-[100vh] flex-1">
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
        <ScrollArea className="h-[calc(100vh-128px-50px)]">
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList list={list} />
          </Suspense>
        </ScrollArea>
        <div className="flex items-center px-[20px] h-[50px]">
          <Link
            href={`${pagePath}?page=${Math.max(1, page - 1)}`}
            passHref
            className="mr-auto"
          >
            <Button variant="ghost" size="icon" disabled={page <= 1}>
              <MdArrowCircleLeft size={30} />
            </Button>
          </Link>
          <Link
            href={`${pagePath}?page=${Math.min(totalPage, page + 1)}`}
            passHref
            className="ml-auto"
          >
            <Button variant="ghost" size="icon" disabled={page >= totalPage}>
              <MdArrowCircleRight size={30} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
