import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface VolunteerLoopUser {
  id: string
  name: string
  role: 'volunteer' | 'organization'
  onboarding_complete: boolean
  created_at: string
  account_type: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  volunteerLoopUser: VolunteerLoopUser | null
  isRegistered: boolean
  showRegistration: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  checkUserAccount: () => Promise<void>
  completeRegistration: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [volunteerLoopUser, setVolunteerLoopUser] = useState<VolunteerLoopUser | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [accountChecked, setAccountChecked] = useState(false)

  const checkUserAccount = useCallback(async () => {
    if (!user) return

    try {
      console.log('Checking user account for:', user.id)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking user account:', error)
        return
      }

      if (data && data.onboarding_complete) {
        console.log('User account found and complete:', data)
        setVolunteerLoopUser(data)
        setShowRegistration(false)
      } else {
        console.log('User account not found or incomplete, showing registration')
        setVolunteerLoopUser(null)
        setShowRegistration(true)
      }
    } catch (err) {
      console.error('Error checking user account:', err)
      setVolunteerLoopUser(null)
      setShowRegistration(true)
    } finally {
      setAccountChecked(true)
    }
  }, [user])

  const completeRegistration = () => {
    setShowRegistration(false)
    // Refresh user account data
    checkUserAccount()
  }

  // Effect to check user account when user changes
  useEffect(() => {
    if (user) {
      // For new users, show registration immediately while checking
      setShowRegistration(true)
      checkUserAccount()
    } else {
      setVolunteerLoopUser(null)
      setShowRegistration(false)
      setAccountChecked(false)
    }
  }, [user, checkUserAccount])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setVolunteerLoopUser(null)
      setShowRegistration(false)
      setAccountChecked(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Determine if we should show registration
  // Show registration if user is authenticated but account check is not complete
  // OR if account check is complete and user needs registration
  const shouldShowRegistration = Boolean(user && (!accountChecked || showRegistration))

  const value = {
    user,
    session,
    loading,
    volunteerLoopUser,
    isRegistered: !!volunteerLoopUser?.onboarding_complete,
    showRegistration: shouldShowRegistration,
    signInWithGoogle,
    signOut,
    checkUserAccount,
    completeRegistration
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 