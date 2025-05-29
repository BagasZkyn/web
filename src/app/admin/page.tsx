'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { ShieldCheck } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.user_metadata?.role !== 'admin') {
        router.push('/')
      } else {
        setUser(user)
      }
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-center mt-16 text-white">Loading...</p>
  if (!user) return null

  return (
    <div className="container mx-auto py-16 px-4 text-foreground">
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6" /> Admin Panel
        </h2>
      </div>
      <div className="bg-background border border-border rounded-lg shadow-xl p-8 max-w-2xl mx-auto space-y-4">
        <p className="text-muted-foreground">Welcome, <strong>{user.email}</strong></p>
        <p>You have access to admin-only features here.</p>
        {/* Tambahkan fitur admin di sini */}
      </div>
    </div>
  )
}