import { getProfile } from '@/lib/dal'
import Link from 'next/link'
import { deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

function SignIn() {
  return (
    <button className="rounded-md bg-blue-500 py-1 px-2 text-white">
      <Link href="/auth/signin">登录</Link>
    </button>
  )
}

function SignOut(props: { username: string }) {
  // 服务端组件不能使用onClick，需要使用form的action
  return (
    <form
      action={async () => {
        'use server'
        deleteSession()
        redirect('/auth/signin')
      }}
    >
      <span className="mr-2">{props.username}</span>
      <button className="rounded-md bg-blue-500 py-1 px-2 text-white">
        退出登录
      </button>
    </form>
  )
}

export default async function Header() {
  const profile = await getProfile()
  return (
    <div className="sticky top bg-white p-2 flex justify-end text-[14px]">
      {profile ? <SignOut username={profile.username} /> : <SignIn />}
    </div>
  )
}
