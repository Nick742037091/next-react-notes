'use client'

import { logout } from '@/app/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sleep } from '@/lib/utils'
import { Button } from './shadcn/button'

export default function SignOut(props: { username: string }) {
  // 客户端组件才能使用状态
  // 可以使用useFormStatus获取请求中状态，使用useFormState获取请求结果，但是需要结合form使用，感觉也不好用
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleLogout = async () => {
    setIsLoading(true)
    // 在客户端组件中使用action server，相当于发起请求，可以使用await
    await logout()
    setIsLoading(false)
    router.push('/')
  }
  return (
    <div>
      <span className="mr-2">{props.username}</span>
      <Button color="primary" onClick={handleLogout}>
        {isLoading ? '退出中...' : '退出登录'}
      </Button>
    </div>
  )
}
