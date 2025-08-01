import React from 'react'
import { Image, Text, View } from 'react-native'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getMediaSource } from '@/utils/getMediaSource'

import { useProduct } from './useProduct'

const Product = () => {
  const { product, isLoading } = useProduct()
  // console.log('Product:', product)

  if (isLoading) return <Loader />
  if (!product) return null

  return (
    <Layout>
      <View className='items-center justify-center'>
        <Image
          source={getMediaSource(product.image)}
          width={260}
          height={260}
        />
      </View>
    </Layout>
  )
}

export default Product
