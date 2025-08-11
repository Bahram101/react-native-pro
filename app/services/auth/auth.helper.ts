import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import {
  EnumAsyncStorage,
  EnumSecureStore,
  IAuthResponse,
  ITokens
} from '@/types/auth.interface'

import { API_URL } from '@/config/api.config'

export const getAccessToken = async () => {
  const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN)
  return accessToken || null
}

export const getRefreshToken = async () => {
  const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN)
  return refreshToken || null
}

export const saveTokensStorage = async (data: ITokens) => {
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.accessToken)
  await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refreshToken)
}

export const deleteTokensStorage = async () => {
  await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN)
  await deleteItemAsync(EnumSecureStore.REFRESH_TOKEN)
}

export const getUserFromStorage = async () => {
  try {
    return JSON.parse(
      (await AsyncStorage.getItem(EnumAsyncStorage.USER)) || '{}'
    )
  } catch (e) {
    return null
  }
}

export const saveAccessToken = async (token: string) => {
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, token)
}

export const saveToStorage = async (data: IAuthResponse) => {
  await saveTokensStorage(data)
  try {
    await AsyncStorage.setItem(EnumAsyncStorage.USER, JSON.stringify(data.user))
  } catch (e) {}
}

export const getNewTokens = async () => {
  try {
    const refreshToken = await getRefreshToken()

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

    if (response.data.accessToken)
      await saveAccessToken(response.data.accessToken)

    return response
  } catch (e) {
    throw e
  }
}
