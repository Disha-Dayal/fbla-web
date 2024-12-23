'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

type UserType = 'student' | 'counselor' | 'employer'

interface SignInModalContentProps {
  onClose: () => void
}

export default function SignInModalContent({ onClose }: SignInModalContentProps) {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleSignIn = async () => {
    if (!userType) {
      alert('Please select your role, then sign in with Google')
      return
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          user_type: userType
        }
      }
    })
    if (error) {
      console.error('Error signing in with Google:', error.message)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Get user metadata
      const { data: userData } = await supabase.auth.getUser()
      const userType = userData.user?.user_metadata?.user_type

      // Redirect based on user type
      if (userType === 'employer') {
        router.push('/employer')
      } else {
        router.push('/dashboard')
      }
      
      onClose()
    } catch (error) {
      console.error('Error signing in:', error)
      setError('Invalid email or password')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        {/* Rest of your modal content */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-cormorant font-bold text-[#660000]">Sign In</h2>
          <button onClick={onClose} className="text-[#660000] hover:text-[#7D0A0A]">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Rest of your existing JSX */}
        {/* ... */}
      </div>
    </div>
  )
} 