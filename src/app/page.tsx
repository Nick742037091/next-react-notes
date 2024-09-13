import { getProfile } from '@/lib/dal'

export default async function Page() {
  const profile = await getProfile()
  // 退出登录，没有session，且未跳转新页面时，显示空白
  if (!profile) {
    return null
  }
  return (
    <div className="p-[20px] text-[28px]">
      Click a note on the left to view something! 🥺
    </div>
  )
}
