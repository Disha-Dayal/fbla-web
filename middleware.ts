import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/signup', req.url))
  }

  // Check if user is an employer
  const { data: { user } } = await supabase.auth.getUser()
  if (req.nextUrl.pathname.startsWith('/employer') && user?.user_metadata?.user_type !== 'employer') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/employer/:path*']
} 