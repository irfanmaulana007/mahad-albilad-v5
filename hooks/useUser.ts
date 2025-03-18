import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userService } from 'services/users'
import type { User } from 'types/user'
import useAuthStore from '../stores/useAuthStore'

export const useUser = () => {
  const { user, setUser } = useAuthStore()

  const { data: userData } = useQuery<User>({
    enabled: !!user,
    queryKey: ['user'],
    queryFn: userService.getMe,
  })

  useEffect(() => {
    if (user) return

    if (userData) {
      setUser(userData)
    }
  }, [user, userData, setUser])
}
