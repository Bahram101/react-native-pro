import { request } from './api/request.api'

import { ICategory } from '@/types/category.interface'

export const CategoryService = {
  async getAll() {
    return request<ICategory[]>({
      url: '/categories/get-all',
      method: 'GET'
    })
  },

  async getBySlug(slug: string) {
    return request<ICategory>({
      url: `/categories/by-slug/${slug}`,
      method: 'GET'
    })
  }
}
