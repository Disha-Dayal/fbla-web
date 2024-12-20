'use client'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  onClick?: () => void  // Optional onClick handler
}

export default function BackButton({ onClick }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={onClick || (() => router.back())}  // Use custom onClick if provided, otherwise use router.back()
      className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#660000] hover:text-[#7D0A0A] transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Back</span>
    </button>
  )
} 