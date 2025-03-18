import { User } from 'types/user'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) =>
        set((state) => ({
          ...state,
          user,
        })),
      resetState: () =>
        set(() => ({
          user: null,
        })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useAuthStore
