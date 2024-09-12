import { getProfile } from '@/lib/dal'
import Link from 'next/link'
import SignOut from './Logout'

function SignIn() {
  return (
    <button className="rounded-md bg-blue-500 py-1 px-2 text-white">
      <Link href="/auth/signin">登录</Link>
    </button>
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
