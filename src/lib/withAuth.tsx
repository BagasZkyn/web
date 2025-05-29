import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function AuthComponent(props: P) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) {
          router.push('/auth/login')
        } else {
          setUser(user)
        }
        setLoading(false)
      })
    }, [])

    if (loading) return <p>Loading...</p>
    if (!user) return null
    return <WrappedComponent {...props} />
  }
}
