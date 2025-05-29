'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push('/auth/login')
      else setUser(data.user)
      setLoading(false)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <p className="text-center mt-16 text-white">Loading...</p>
  if (!user) return null

  return (
    <div className="container mx-auto py-16 px-4 text-foreground">
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" /> Your Profile
        </h2>
      </div>
      <div className="bg-background border border-border rounded-lg shadow-xl p-8 max-w-md mx-auto space-y-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.user_metadata?.username || 'Not set'}</p>
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 rounded py-2">
          Logout
        </button>
      </div>
    </div>
  )
}
