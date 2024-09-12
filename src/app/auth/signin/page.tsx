'use client'

import { login } from '@/app/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sleep } from '@/lib/utils'

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
    <div className="border-2 border-gray-300 rounded-md p-[20px]">
      <div className="flex mb-[10px]">
        <label className="w-[100px]">账号</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="p-[5px]"
        />
      </div>
      <div className="flex mb-[10px]">
        <label className="w-[100px]">密码</label>
        <input
          className="p-[5px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </div>
  )
}
