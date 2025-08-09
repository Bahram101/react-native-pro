import axios from 'axios'
import { getItemAsync } from 'expo-secure-store'

import { EnumSecureStore, IAuthResponse } from '@/types/auth.interface'

import { getRefreshToken, saveToStorage } from '@/services/auth/auth.helper'

import { API_URL, getAuthUrl } from '@/config/api.config'

export const getNewTokens = async () => {
  try {
    const refreshToken = await getRefreshToken()
    console.log('getNewTokenn!', refreshToken)

    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new Error('Refresh token is missing or invalid!!')
    }

    const response = await axios.post<string, { data: IAuthResponse }>(
      API_URL + '/auth/refresh-token',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    // console.log('Response from refresh token:', JSON.stringify(response, null, 2))

    if (response.data.accessToken) await saveToStorage(response.data)

    return response
  } catch (e) {
    throw e
  }
}
