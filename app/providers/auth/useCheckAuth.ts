import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { getRefreshToken } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const useCheckAuth = (routeName?: string) => {
  const { user, setUser } = useAuth()

  useEffect(() => {
    const checkRefreshToken = async () => {
      const refreshToken = await getRefreshToken()
      if (!refreshToken && user) {
        await AuthService.logout()
        setUser(null)
      }
    }

    let ignore = checkRefreshToken()
  }, [routeName])
}
