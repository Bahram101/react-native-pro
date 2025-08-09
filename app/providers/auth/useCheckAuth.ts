import { getItemAsync } from 'expo-secure-store'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { EnumSecureStore } from '@/types/auth.interface'

import { errorCatch } from '@/services/api/error.api'
import { getNewTokens } from '@/services/api/helper.auth'
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const useCheckAuth = (routeName?: string) => {
  const { user, setUser } = useAuth()

  useEffect(() => {
    const checkRefreshToken = async () => {
      const refreshToken = await getRefreshToken()
        console.log('Check Refresh Token - useCheckAuth', refreshToken)
      if (!refreshToken && user) {
        console.log('CheckRefreshToken - Logging out...')
        await AuthService.logout()
        setUser(null)
      }
    }

    let ignore = checkRefreshToken()
  }, [routeName])
}
