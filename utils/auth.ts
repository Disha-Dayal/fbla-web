import { supabase } from './supabase'

declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => Promise<void>
  }
}

window.handleSignInWithGoogle = async (response: CredentialResponse) => {
  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })

    if (error) throw error

    // Redirect after successful sign-in
    window.location.href = '/dashboard'
  } catch (error) {
    console.error('Error:', error)
  }
} 