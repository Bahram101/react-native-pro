import { useQuery } from '@tanstack/react-query'

import { useTypedRoute } from '@/hooks/useTypedRoute'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

export const useCategory = () => {
  const { params } = useTypedRoute<'Category'>()

  // console.log('params', params)

  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['get category by slug', params.slug],
    queryFn: () => CategoryService.getBySlug(params.slug)
  })

  const categoryId = category?.id || ''

 const { isLoading: isProductLoading, data: products } = useQuery({
		queryKey: ['get products by category', params.slug],
		queryFn: () => ProductService.getByCategory(params.slug),
		enabled: !!categoryId
	})

  return {
    products,
    category,
    isLoading: isCategoryLoading || isProductLoading
  }
}
