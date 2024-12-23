'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

type UserType = 'student' | 'counselor' | 'employer'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      const { data: { user } } = await supabase.auth.getUser()
      const userType = user?.user_metadata?.user_type

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-cormorant font-bold text-[#660000]">Sign In</h2>
          <button onClick={onClose} className="text-[#660000] hover:text-[#7D0A0A]">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-arial font-medium text-[#8B5E3C] mb-1">
            I am a...
          </label>
          <select
            value={userType || ''}
            onChange={(e) => setUserType(e.target.value as UserType)}
            className="w-full rounded-md border-[#B89F8D] border px-4 py-2 focus:ring-[#B89F8D] focus:border-[#B89F8D] text-[#8B5E3C] text-sm font-arial"
            required
          >
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="counselor">Counselor</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-arial font-medium text-[#8B5E3C]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B89F8D] border px-3 py-2 shadow-sm focus:ring-[#B89F8D] focus:border-[#B89F8D] text-[#8B5E3C]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-arial font-medium text-[#8B5E3C]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B89F8D] border px-3 py-2 shadow-sm focus:ring-[#B89F8D] focus:border-[#B89F8D] text-[#8B5E3C]"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#660000] px-4 py-2 text-white font-arial font-medium hover:bg-[#7D0A0A] transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#B89F8D]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-[#8B5E3C]">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center px-4 py-2 border border-[#B89F8D] rounded-md shadow-sm text-sm font-medium text-[#660000] bg-white hover:bg-[#F2E6E0] transition"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-[#8B5E3C]">
          <a href="/signup" className="font-medium text-[#660000] hover:text-[#7D0A0A] transition">
            New User? Click to Sign Up
          </a>
        </p>
      </div>
    </div>
  )
} 