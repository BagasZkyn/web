'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
    router.push('/profile')
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="container mx-auto py-16 px-4 text-white">
      <div className="bg-black border border-gray-700 rounded-lg shadow-xl p-8 max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Login</h2>
        <input placeholder="Email" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 rounded py-2">Login with Email</button>
        <button onClick={loginWithGoogle} className="w-full bg-red-600 hover:bg-red-700 rounded py-2">Login with Google</button>
        <p className="text-sm text-center text-gray-400">
          Don't have an account? <a href="/auth/register" className="text-blue-400 underline">Register</a>
        </p>
      </div>
    </div>
  )
          }
