'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import SidebarNoteList from '@/components/SidebarNoteList'
import Image from 'next/image'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from './NoteListSkeleton'
import logo from '@/assets/icon/logo.svg'
import { ScrollArea } from './shadcn/scroll-area'
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md'
import { Button } from './shadcn/button'
import { Note } from '@prisma/client'
import { getNotesByPage } from '@/app/actions'

export default function Sidebar() {
  const [list, setList] = useState<Note[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [total, setTotal] = useState(0)
  const totalPage = Math.ceil(total / pageSize)
  useEffect(() => {
    const getNodeList = async () => {
      const { list, count } = await getNotesByPage(page, pageSize)
      setList(list)
      setTotal(count)
    }
    getNodeList()
  }, [page])
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
          <Button
            variant="ghost"
            size="icon"
            disabled={page <= 1}
            className="mr-auto"
            onClick={() => setPage(page - 1)}
          >
            <MdArrowCircleLeft size={30} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={page >= totalPage}
            className="ml-auto"
            onClick={() => setPage(page + 1)}
          >
            <MdArrowCircleRight size={30} />
          </Button>
        </div>
      </section>
    </>
  )
}
