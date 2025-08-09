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
    const checkAccessToken = async () => {
      const accessToken = await getAccessToken()
      console.log('CHECK_ACCESS_TOKEN')
      if (accessToken) {
        try {
          await getNewTokens()
        } catch (e) {
          if (errorCatch(e) === 'jwt expired') {
            console.log('JWT expired, logging out...')
            await AuthService.logout()
            setUser(null)
          }
        }
      }
    }

    let ignore = checkAccessToken()
  }, [])

  useEffect(() => {
    console.log('useCheckAuth - user', user)
    const checkRefreshToken = async () => {
      const refreshToken = await getRefreshToken()
        console.log('useCheckAuth - refresh', refreshToken)
      if (!refreshToken && user) {
        console.log('useCheckAuth - Logging out')
        await AuthService.logout()
        setUser(null)
      }
    }

    let ignore = checkRefreshToken()
  }, [routeName])
}
