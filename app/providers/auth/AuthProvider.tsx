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

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<TypeUserState>({} as IUser)
  // const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    let isMounted = true

    const checkAccessToken = async () => {
      console.log('auth-provider')
      try {
        const accessToken = await getAccessToken()
        if (accessToken) {
          const user = await getUserFromStorage()
          if (isMounted) {
            setUser(user)
          }
        } else { 
          setUser(null)
        }
      } catch {
          // setUser(null)
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
