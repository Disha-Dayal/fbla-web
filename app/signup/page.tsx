'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'
import Script from 'next/script'

type UserType = 'student' | 'counselor' | 'employer'

// First, add window type declaration at the top of the file
declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => Promise<void>;
    google: any;
  }
}

export default function SignUp() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: '',
    studentId: ''
  })
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
    setStep(2)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            user_type: userType,
            organization: formData.organization,
            studentId: userType === 'student' ? formData.studentId : null
          }
        }
      })

      if (error) throw error
      router.push('/verification')
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>, message: string) => {
    const rect = e.target.getBoundingClientRect()
    setTooltipPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    })
    setShowTooltip(true)
  }

  const handleGoogleScriptLoad = () => {
    if (typeof window !== 'undefined') {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: window.handleSignInWithGoogle,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F1EE] text-[#660000] relative">
      {/* Geometric Background */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#660000] opacity-5 rounded-br-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-2/3 h-1/3 bg-[#660000] opacity-5 rounded-tl-3xl animate-float-reverse"></div>
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-[#660000] opacity-5 rounded-tr-3xl animate-float" style={{animationDelay: '2s'}}></div>

      {/* Add Google Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={handleGoogleScriptLoad}
        strategy="lazyOnload"
      />

      {/* Back Button */}
      <BackButton onClick={step === 2 ? () => setStep(1) : undefined} />

      {/* Page Container */}
      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <div className="w-full max-w-4xl bg-white p-12 rounded-2xl shadow-2xl">
          {step === 1 ? (
            <div>
              <h1 className="text-5xl font-cormorant font-bold text-center mb-8 text-[#660000]">I am a...</h1>
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => handleUserTypeSelect('student')}
                  className="bg-[#660000] text-white p-6 rounded-lg shadow-md hover:bg-[#7D0A0A] transition"
                >
                  <h3 className="text-xl font-bold mb-2">Student</h3>
                  <p className="text-sm font-arial opacity-80">
                    Find academic opportunities
                  </p>
                </button>

                <button
                  onClick={() => handleUserTypeSelect('counselor')}
                  className="bg-[#F8F1EE] border-2 border-[#B89F8D] text-[#660000] p-6 rounded-lg shadow-md hover:bg-[#F2E6E0] transition"
                >
                  <h3 className="text-xl font-bold mb-2">Counselor</h3>
                  <p className="text-sm font-arial opacity-80">
                    Guide and support students
                  </p>
                </button>

                <button
                  onClick={() => handleUserTypeSelect('employer')}
                  className="bg-[#660000] text-white p-6 rounded-lg shadow-md hover:bg-[#7D0A0A] transition"
                >
                  <h3 className="text-xl font-bold mb-2">Employer</h3>
                  <p className="text-sm font-arial opacity-80">
                    Post jobs and find talent
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6">
              <h2 className="text-4xl font-cormorant font-bold text-center text-[#660000] mb-6">
                Create Account
              </h2>
              <div className="relative">
                <label className="block text-sm font-arial font-medium text-[#660000]">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-[#B89F8D] border px-4 py-2 focus:ring-[#B89F8D] focus:border-[#B89F8D]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={(e) => handleInputFocus(e, `Signing up as ${userType}`)}
                  onBlur={() => setShowTooltip(false)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#660000]">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-[#B89F8D] border px-4 py-2 focus:ring-[#B89F8D] focus:border-[#B89F8D]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#660000]">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border-[#B89F8D] border px-4 py-2 focus:ring-[#B89F8D] focus:border-[#B89F8D]"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {userType === 'student' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-[#660000]">Student ID</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-[#B89F8D] border px-4 py-2 focus:ring-[#B89F8D] focus:border-[#B89F8D]"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    onFocus={(e) => handleInputFocus(e, 'Required for student verification')}
                    onBlur={() => setShowTooltip(false)}
                  />
                </div>
              )}

              {(userType === 'employer' || userType === 'counselor') && (
                <div className="relative">
                  <label className="block text-sm font-medium text-[#660000]">
                    {userType === 'employer' ? 'Company Name' : 'School/Institution'}
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-[#B89F8D] border px-4 py-2 focus:ring-[#B89F8D] focus:border-[#B89F8D]"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    onFocus={(e) => handleInputFocus(e, userType === 'employer' ? 'Company details will be verified' : 'School/Institution will be verified')}
                    onBlur={() => setShowTooltip(false)}
                  />
                </div>
              )}

              {showTooltip && (
                <div 
                  className="absolute bg-[#660000] text-white px-4 py-2 rounded-md text-sm shadow-lg z-50 transition-opacity"
                  style={{
                    top: `${tooltipPosition.top}px`,
                    left: `${tooltipPosition.left}px`,
                  }}
                >
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-[#660000] transform rotate-45"></div>
                  <p>You're signing up as a {userType}</p>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => window.google?.accounts.id.prompt()}
                  className="flex-1 py-3 px-8 border rounded-md text-sm font-medium text-[#660000] bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5">
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 px-8 border rounded-md text-sm font-arial font-medium text-white bg-[#660000] hover:bg-[#7D0A0A] transition"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
