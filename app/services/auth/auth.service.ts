import AsyncStorage from '@react-native-async-storage/async-storage'

import { EnumAsyncStorage, IAuthResponse } from '@/types/auth.interface'

import { deleteTokensStorage, saveToStorage } from '@/services/auth/auth.helper'

import { getAuthUrl } from '@/config/api.config'

import { request } from '../api/request.api'

export const AuthService = {
  async main(variant: 'reg' | 'login', email: string, password: string) {
    try {
      const response = await request<IAuthResponse>({
        url: getAuthUrl(`/${variant === 'reg' ? 'register' : 'login'}`),
        method: 'POST',
        data: { email, password }
      })

      if (response.accessToken) {
        await saveToStorage(response)
        // console.log('Access token saved to storage')
      } else {
        // console.log('No access token received')
      }

      return response
    } catch (error) {
      // console.error('Error in main function: ', error)
      throw error
    }
  },

  async logout() {
    await deleteTokensStorage()
    await AsyncStorage.removeItem(EnumAsyncStorage.USER)
  }
}
