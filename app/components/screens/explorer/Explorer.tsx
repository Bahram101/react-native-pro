import React from 'react'
import { Text, View } from 'react-native'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'

import { useGetAllProducts } from './useGetAllProducts'

const Explorer = () => {
  const { products, isLoading } = useGetAllProducts()
  console.log('EXPOLORER')
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <Catalog title='Explorer' products={products || []} />
      )}
    </Layout>
  )
}

export default Explorer
