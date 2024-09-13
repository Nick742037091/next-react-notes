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
      style: {
        bottom: '8px',
        right: '8px',
        position: 'fixed',
        width: 'auto'
      },
      duration: 3000,
      ...options,
      variant: 'destructive'
    })
}
