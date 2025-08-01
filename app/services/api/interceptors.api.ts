import axios from 'axios'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import {
  deleteTokensStorage,
  getAccessToken
} from '@/services/auth/auth.helper'

import { API_URL } from '@/config/api.config'

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
    const msg = errorCatch(error)
    console.log('Token refresh failed:', msg) 
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      console.log('OKOKOK')
      originalRequest._isRetry = true
      try {
        await getNewTokens()
        return instance.request(originalRequest)
      } catch (error: any) {
        const msg2 = errorCatch(error) 
        console.log('Token refresh failed:', msg2)
        if (msg2 === 'Unauthorized') {
          console.log(' logging out')
          await deleteTokensStorage()
          await AuthService.logout()
        } else {
          console.log('No new tokens received, logging out...', msg2)
        }
      }
    } else {
      console.log('An error occurred:', msg)
      // return Promise.reject(error)
    }

    throw error
  }
)

// instance.interceptors.response.use(
//   config => config,
//   async error => {
//     const originalRequest = error.config

//     if (
//       error.response.statusCode === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true
//       try {
//         await getNewTokens()
//         return instance.request(originalRequest)
//       } catch (error) {
//         const msg = errorCatch(error)
//         console.log('Token refresh  failed:', msg)
//         if (msg === 'Unauthorized') {
//           await deleteTokensStorage()
//         }else{
//           console.log('No new tokens received, logging out...')
//         }
//       }
//     }

//     throw error
//   }
// )
export default instance
