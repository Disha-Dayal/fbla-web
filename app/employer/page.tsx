'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function EmployerDashboard() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/signup')
        return
      }

      if (user.user_metadata?.user_type !== 'employer') {
        router.push('/dashboard')
      }
    }

    checkUser()
  }, [router])

  return (
    <div className="min-h-screen bg-[#F8F1EE]">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-cormorant font-bold text-[#660000]">
            Employer Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Main content will go here */}
      </main>

      <button 
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#660000] text-white rounded-full shadow-lg 
                   hover:bg-[#7D0A0A] transition-colors duration-200 flex items-center justify-center
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000] text-3xl font-bold"
        onClick={() => {/* Handle new job creation */}}
      >
        +
      </button>
    </div>
  )
} 