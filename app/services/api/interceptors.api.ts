import axios from 'axios'

import { useAuth } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import {
  deleteTokensStorage,
  getAccessToken
} from '@/services/auth/auth.helper'

import { API_URL } from '@/config/api.config'

import { AuthService } from '../auth/auth.service'

import { errorCatch } from './error.api'
import { getNewTokens } from './helper.auth'
import Auth from '@/components/screens/auth/Auth'
import { logoutWithContext } from '../auth/auth.helper-context'

// const {setUser} = useAuth()

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(async config => {
  const accessToken = await getAccessToken()

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config 
    if (error.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        console.log('TRYYY')        
        await getNewTokens()
        return instance.request(originalRequest)
      } catch (refreshError) {
        const errorMessage = errorCatch(refreshError)
        console.log('errorMessage', errorMessage)
        if (errorCatch(refreshError) === 'jwt expired') { 
          console.log('Logout')
          await logoutWithContext(AuthService.logout) 
        }
      }
    }

    throw error
  }
)

export default instance
