import { IUser } from '@/types/user.interface'

import { getUsersUrl } from '@/config/api.config'

import { request } from './api/request.api'

export const UserService = {
  async getProfile() {
    return request<IUser>({
      url: '/users/profile',
      method: 'GET'
    })
  },

  async toggleFavorite(productId: string) {
    return request<IUser>({
      url: `/users/profile/favorites/${productId}`,
      method: 'PATCH'
    })
  }
}
