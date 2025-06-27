import { IProduct } from '@/types/product.interface'

import { request } from './api/request.api'

export const ProductService = {
  async getAll(searchTerm?: string) {
    return request<IProduct[]>({
      url: '/products',
      method: 'GET',
      params: searchTerm
        ? {
            searchTerm
          }
        : {}
    })
  },

  async getBySlug(slug: string) {
    return request<IProduct>({
      url: `/products/by-slug/${slug}`,
      method: 'GET'
    })
  },

  async getByCategory(categorySlug: string) {
    return request<IProduct>({
      url: `/products/by-category/${categorySlug}`,
      method: 'GET',
      // data: { categorySlug }
    })
  }
}
