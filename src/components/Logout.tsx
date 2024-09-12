import { deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

function SignOut(props: { username: string; className: string }) {
  return (
    <div className={props.className}>
      <span className="mr-2">{props.username}</span>
      <button
        className="rounded-md bg-white p-2"
        onClick={() => {
          deleteSession()
          redirect('/auth/signin')
        }}
      >
        退出登录
      </button>
    </div>
  )
}
