import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { ProductService } from '@/services/product.service'

import { useSearchForm } from './useSearchForm'

export const useSearch = () => {
  const { searchTerm, debouncedSearch, control } = useSearchForm()

  const qc = useQueryClient()
  const isEnabled = !!debouncedSearch && debouncedSearch?.length > 2

  const { data: products, isLoading } = useQuery({
    queryKey: ['search products', debouncedSearch],
    queryFn: () => ProductService.getAll(debouncedSearch),
    enabled: isEnabled
  })

  console.log('isEnabled', isEnabled)

  useEffect(() => {
    if (!isEnabled) {
      qc.removeQueries({ queryKey: ['search products', debouncedSearch] })
    }
  }, [isEnabled, qc])

  return { products: isEnabled ? products : [], isLoading, control, searchTerm }
}
