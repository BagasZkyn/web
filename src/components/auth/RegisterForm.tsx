import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const registerWithEmail = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    if (error) alert(error.message)
    else alert('Check your email to verify your account!')
  }

  return (
    <div className="p-8 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input placeholder="Username" className="w-full p-2 border" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" className="w-full p-2 border" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full p-2 border" onChange={e => setPassword(e.target.value)} />
      <button onClick={registerWithEmail} className="w-full bg-blue-500 text-white p-2">Register with Email</button>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })} className="w-full bg-red-500 text-white p-2">Register with Google</button>
      <p className="text-sm text-center">Already have an account? <a className="text-blue-600" href="/auth/login">Login</a></p>
    </div>
  )
    
