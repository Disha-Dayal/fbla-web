'use client'
import { useEffect, useState } from 'react'
import '../utils/auth'
import SignInModal from '@/components/SignInModal'
import Link from 'next/link'

export default function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)


  return (
    <div className="h-screen bg-[#F8F1EE] text-[#660000] relative flex flex-col">
      {/* Geometric Background - same position */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#660000] opacity-5 rounded-br-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-2/3 h-1/3 bg-[#660000] opacity-5 rounded-tl-3xl animate-float-reverse"></div>
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-[#660000] opacity-5 rounded-tr-3xl animate-float" 
        style={{animationDelay: '2s'}}
      ></div>

      {/* Header - kept compact */}
      <header className="relative z-10 bg-[#F8F1EE] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <h1 className="text-2xl font-cormorant font-bold text-[#660000]">Inspira</h1>
          <div>
            <button
              onClick={() => setIsSignInOpen(true)}
              className="px-5 py-1.5 rounded-md bg-[#660000] text-white font-arial font-medium hover:bg-[#7D0A0A] transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - evenly spaced */}
      <main className="relative z-10 flex-1 flex flex-col justify-evenly max-w-6xl mx-auto px-6">
        {/* Hero Section - removed margins */}
        <div className="text-center">
          <h2 className="text-4xl font-cormorant font-bold mb-4 text-[#660000]">
            Inspira
          </h2>
          <p className="text-lg font-arial text-[#8B5E3C] mb-6 max-w-2xl mx-auto">
            Unlock academic opportunities through a platform that empowers students, counselors, and employers to connect and thrive together.
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="px-8 py-2.5 bg-[#660000] text-white rounded-md hover:bg-[#7D0A0A] transition font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm h-60 flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-[#660000]">For Students</h2>
            <ul className="space-y-3 text-sm font-arial text-[#8B5E3C] flex-grow">
              <li>• Browse Academic Jobs & Internships</li>
              <li>• Connect with Career Counselors</li>
              <li>• Track Your Applications</li>
              <li>• Get Career Development Support</li>
              <li>• Access Learning Resources</li>
            </ul>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm h-60 flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-[#660000]">For Employers</h2>
            <ul className="space-y-3 text-sm font-arial text-[#8B5E3C] flex-grow">
              <li>• Post Academic Positions</li>
              <li>• Find Top Candidates</li>
              <li>• Manage Applications Easily</li>
              <li>• Connect with Institutions</li>
              <li>• View Recruitment Analytics</li>
            </ul>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm h-60 flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-[#660000]">For Counselors</h2>
            <ul className="space-y-3 text-sm font-arial text-[#8B5E3C] flex-grow">
              <li>• Review Student Applications</li>
              <li>• Write Recommendations</li>
              <li>• Monitor Student Progress</li>
              <li>• Host Career Workshops</li>
              <li>• Access Support Tools</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer - reduced top padding */}
      <footer className="relative z-10 bg-[#F8F1EE] border-t border-[#B89F8D] py-2 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-sm text-[#8B5E3C] pl-2">
            © 2024 Inspira. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="/about" className="text-sm text-[#8B5E3C] hover:text-[#660000] transition">About</a>
            <a href="/contact" className="text-sm text-[#8B5E3C] hover:text-[#660000] transition">Contact</a>
            <a href="/privacy" className="text-sm text-[#8B5E3C] hover:text-[#660000] transition">Privacy</a>
          </div>
        </div>
      </footer>

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </div>
  )
}
