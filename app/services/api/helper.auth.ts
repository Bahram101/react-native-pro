import axios from 'axios'
import { getItemAsync } from 'expo-secure-store'

import { EnumSecureStore, IAuthResponse } from '@/types/auth.interface'

import { saveToStorage } from '@/services/auth/auth.helper'

import { API_URL, getAuthUrl } from '@/config/api.config'

export const getNewTokens = async () => {
	console.log('Requesting new tokens...')
	try {
		const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN) 

		const response = await axios.post<string, { data: IAuthResponse }>(
			API_URL + '/auth/login/access-token',
			{ refreshToken },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		console.log('New tokens received:::', response.data)

		if (response.data.accessToken) await saveToStorage(response.data)

		return response
	} catch (e) {}
}
