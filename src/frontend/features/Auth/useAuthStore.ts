import { create } from 'zustand'
import AuthUser from '@/backend/models/AuthUser'

interface AuthState {
  authUser: AuthUser | null
  setAuthUser: (authUser: AuthUser) => void
}

const useAuthStore = create<AuthState>()((set) => ({
  authUser: null,
  setAuthUser: (authUser) => set(() => ({ authUser: authUser })),
}))

export default useAuthStore
