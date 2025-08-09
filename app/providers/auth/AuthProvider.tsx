import * as SplashScreen from 'expo-splash-screen'
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from 'react'

import { IUser } from '@/types/user.interface'

import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'
import { registerSetUser } from '@/services/auth/auth.helper-context'

import { IContext, TypeUserState } from './auth-provider.interface'
import { getNewTokens } from '@/services/api/helper.auth'
import { errorCatch } from '@/services/api/error.api'
import { AuthService } from '@/services/auth/auth.service'

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<TypeUserState>({} as IUser)

  useEffect(() => {
    let isMounted = true

    const checkAccessToken = async () => {
      console.log('AuthProvider: checking access token')

      try {
        const accessToken = await getAccessToken()

        if (accessToken) {
          try {
            // Пробуем обновить токены
            await getNewTokens()
            const userFromStorage = await getUserFromStorage()
            if (isMounted) {
              setUser(userFromStorage)
            }
          } catch (e) {
            console.log('Error in getNewTokens', e)
            if (errorCatch(e) === 'jwt expired') {
              console.log('JWT expired, logging out...')
              await AuthService.logout()
              if (isMounted) setUser(null)
            }
          }
        } else {
          if (isMounted) setUser(null)
        }
      } catch (err) {
        console.log('AuthProvider error', err)
      } finally {
        await SplashScreen.hideAsync()
      }
    }

    let ignore = checkAccessToken()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    registerSetUser(setUser)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
