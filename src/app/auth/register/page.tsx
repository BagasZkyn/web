'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Mail, Lock, User, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleRegister = async () => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        role: email === 'bzakyan@gmail.com' ? 'admin' : 'user'
      }
    }
  })
  if (error) return alert(error.message)
  alert('Check your email to verify your account!')
  router.push('/auth/login')
}

  const registerWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div className="container mx-auto py-16 px-4 text-foreground">
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="h-6 w-6" /> Register
        </h2>
      </div>
      <div className="bg-background border border-border rounded-lg shadow-xl p-8 max-w-md mx-auto space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            placeholder="Username"
            className="w-full pl-10 p-2 bg-muted border border-border rounded text-foreground"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            placeholder="Email"
            className="w-full pl-10 p-2 bg-muted border border-border rounded text-foreground"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 p-2 bg-muted border border-border rounded text-foreground"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 rounded py-2">
          Register with Email
        </button>
        <button onClick={registerWithGoogle} className="w-full bg-red-600 hover:bg-red-700 rounded py-2">
          Register with Google
        </button>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account? <a href="/auth/login" className="text-blue-500 underline">Login</a>
        </p>
      </div>
    </div>
  )
}
