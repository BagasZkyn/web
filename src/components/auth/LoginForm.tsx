import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/profile')
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="p-8 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input placeholder="Email" className="w-full p-2 border" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full p-2 border" onChange={e => setPassword(e.target.value)} />
      <button onClick={loginWithEmail} className="w-full bg-blue-500 text-white p-2">Login with Email</button>
      <button onClick={loginWithGoogle} className="w-full bg-red-500 text-white p-2">Login with Google</button>
      <p className="text-sm text-center">Don't have an account? <a className="text-blue-600" href="/auth/register">Register</a></p>
    </div>
  )
}
