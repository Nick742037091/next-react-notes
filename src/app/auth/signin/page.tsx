'use client'

import { login } from '@/app/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcn/card'

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await login(username, password)

    if (res.code === 0) {
      // 等待cookie更新
      await sleep(100)
      setIsLoading(false)
      router.replace('/')
    } else {
      setIsLoading(false)
      alert(res.message)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>笔记系统</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-[10px]">
            <label className="w-[100px]">账号</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="p-[5px]"
            />
          </div>
          <div className="flex mb-[10px]">
            <label className="w-[100px]">密码</label>
            <Input
              className="p-[5px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
