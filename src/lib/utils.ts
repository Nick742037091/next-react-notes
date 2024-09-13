import { useToast } from '@/hooks/use-toast'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const useError = () => {
  const { toast } = useToast()
  return (options: Parameters<typeof toast>[0]) =>
    toast({
      // className: cn('flex fixed max-w-[200px] top-[8px] right-[8px]'),
      duration: 2000,
      ...options,
      variant: 'destructive'
    })
}
