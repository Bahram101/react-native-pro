import axios from 'axios'

import { getAccessToken } from '@/services/auth/auth.helper'

import { API_URL } from '@/config/api.config'

import { logoutWithContext } from '../auth/auth.helper-context'
import { AuthService } from '../auth/auth.service'

import { errorCatch } from './error.api'
import { getNewTokens } from './helper.auth'

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
        console.log('TRYYYY')
        await getNewTokens()
        return instance.request(originalRequest)
      } catch (refreshError) {
        const errorMessage = errorCatch(refreshError)
        console.log('Refresh Error', errorMessage)
        if (errorCatch(refreshError) === 'jwt expired') {
          console.log('INTERCEPTOR JWT expired, logging out.....')
          await logoutWithContext(AuthService.logout)
        }
      }
    }

    throw error
  }
)

export default instance
