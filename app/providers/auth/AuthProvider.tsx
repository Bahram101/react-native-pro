import * as SplashScreen from 'expo-splash-screen'
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from 'react'

import { IUser } from '@/types/user.interface'

import { getAccessToken, getNewTokens, getUserFromStorage } from '@/services/auth/auth.helper'
import { registerSetUser } from '@/services/auth/auth.helper-context'

import { IContext, TypeUserState } from './auth-provider.interface'
import { errorCatch } from '@/services/api/error.api'
import { AuthService } from '@/services/auth/auth.service'

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<TypeUserState>({} as IUser)

  useEffect(() => {
    let isMounted = true

    const checkAccessToken = async () => {

      try {
        const accessToken = await getAccessToken()

        if (accessToken) {
          try {
            await getNewTokens()
            const userFromStorage = await getUserFromStorage()
            if (isMounted) {
              setUser(userFromStorage)
            }
          } catch (e) {
            if (errorCatch(e) === 'jwt expired') {
              await AuthService.logout()
              if (isMounted) setUser(null)
            }
          }
        } else {
          if (isMounted) setUser(null)
        }
      } catch (err) {
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
