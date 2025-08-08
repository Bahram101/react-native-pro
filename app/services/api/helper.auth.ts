import axios from 'axios'
import { getItemAsync } from 'expo-secure-store'

import { EnumSecureStore, IAuthResponse } from '@/types/auth.interface'

import { getRefreshToken, saveToStorage } from '@/services/auth/auth.helper'

import { API_URL, getAuthUrl } from '@/config/api.config'

export const getNewTokens = async () => {
  try {
    const refreshToken = await getRefreshToken()
		console.log('Get new tokenn', refreshToken)

    // if (!refreshToken) {
    //   return null
    // }

    const response = await axios.post<string, { data: IAuthResponse }>(
      API_URL + '/auth/refresh-token',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.accessToken) await saveToStorage(response.data)
		// console.log('responsee', response)	
    return response
  } catch (e) {
		console.log('eeeeeee',e)
    console.error('Ошибка при обновлении токен', e)
    throw e
  }
}
