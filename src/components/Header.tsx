import { getProfile } from '@/lib/dal'
import Link from 'next/link'
import SignOut from './Logout'
import { Button } from './shadcn/button'

function SignIn() {
  return (
    <Button>
      <Link href="/auth/signin">登录</Link>
    </Button>
  )
}

export default async function Header() {
  const profile = await getProfile()
  return (
    <div className="absolute top-[10px] right-[10px] bg-white p-2 flex justify-end text-[14px]">
      {profile ? <SignOut username={profile.username} /> : null}
    </div>
  )
}
