import BackButton from '@/components/BackButton'

export default function Verification() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <BackButton />
      
      <div className="max-w-md w-full mx-auto text-center space-y-6">
        <h2 className="text-3xl font-cormorant font-bold text-[#660000]">
          Check Your Email
        </h2>
        <p className="text-lg text-[#8B5E3C]">
          We've sent you a verification link. Please check your email and click the link to verify your account.
        </p>
        <p className="text-sm text-[#8B5E3C]">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  )
} 