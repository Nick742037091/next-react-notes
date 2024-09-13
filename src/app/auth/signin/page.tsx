'use client'

import { login } from '@/app/actions'
import { useState } from 'react'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcn/card'
import { useError } from '@/lib/utils'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const error = useError()

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await login(username, password)
    if (res && res.code !== 0) {
      setIsLoading(false)
      error({ description: '登录失败' })
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
