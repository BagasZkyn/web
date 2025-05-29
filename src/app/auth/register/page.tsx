'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    if (error) return alert(error.message)
    alert('Check your email to verify your account!')
    router.push('/auth/login')
  }

  const registerWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="container mx-auto py-16 px-4 text-white">
      <div className="bg-black border border-gray-700 rounded-lg shadow-xl p-8 max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Register</h2>
        <input placeholder="Username" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" onChange={e => setUsername(e.target.value)} />
        <input placeholder="Email" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" className="w-full p-2 bg-gray-800 border border-gray-700 rounded" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 rounded py-2">Register with Email</button>
        <button onClick={registerWithGoogle} className="w-full bg-red-600 hover:bg-red-700 rounded py-2">Register with Google</button>
        <p className="text-sm text-center text-gray-400">
          Already have an account? <a href="/auth/login" className="text-blue-400 underline">Login</a>
        </p>
      </div>
    </div>
  )
}
