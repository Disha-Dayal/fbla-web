'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'
import SignInModal from '@/components/SignInModal'

type UserType = 'student' | 'counselor' | 'employer'


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
  const [isSignInOpen, setIsSignInOpen] = useState(false)

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
      
      if (userType === 'employer') {
        router.push('/employer')
      } else {
        router.push('/verification')
      }
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
    <div className="min-h-screen bg-[#F8F1EE] text-[#660000] relative">
      {/* Geometric Background */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#660000] opacity-5 rounded-br-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-2/3 h-1/3 bg-[#660000] opacity-5 rounded-tl-3xl animate-float-reverse"></div>
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-[#660000] opacity-5 rounded-tr-3xl animate-float" style={{animationDelay: '2s'}}></div>

      {/* Back Button */}
      <BackButton onClick={step === 2 ? () => setStep(1) : undefined} />

      {/* Page Container */}
      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        {/* White box - slightly reduced width */}
        <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-auto">
          {step === 1 ? (
            <div>
              <h1 className="text-4xl font-cormorant font-bold text-center mb-6 text-[#660000]">I am a...</h1>
              {/* Grid Layout - reduce gap */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <form onSubmit={handleSignUp} className="space-y-4">
              <h2 className="text-3xl font-cormorant font-bold text-center text-[#660000] mb-4">
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

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-3 px-8 bg-[#660000] text-white rounded-md hover:bg-[#7D0A0A] transition font-arial font-medium text-sm"
                >
                  Create Account
                </button>
              </div>

              {/* Add the divider and Google sign-in */}
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
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full max-w-md flex items-center justify-center px-4 py-2 border border-[#B89F8D] rounded-md shadow-sm text-sm font-medium text-[#660000] bg-white hover:bg-[#F2E6E0] transition"
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google logo"
                      className="w-5 h-5 mr-2"
                    />
                    Sign up with Google
                  </button>
                </div>
              </div>

              <p 
                onClick={() => setIsSignInOpen(true)}
                className="mt-4 text-center text-sm text-[#8B5E3C] cursor-pointer hover:text-[#660000] transition"
              >
                Already have an account? <span className="font-medium text-[#660000] hover:text-[#7D0A0A]">Sign In</span>
              </p>
            </form>
          )}
        </div>
      </div>

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </div>
  )
}
