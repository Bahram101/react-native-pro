import React from 'react'
import { Text, View } from 'react-native'

import Layout from '@/components/layout/Layout'
import Heading from '@/components/ui/Heading'

import { useSearch } from './useSearch'
import Field from '@/components/ui/field/Field'
import { ISearchFormData } from './search.interface'
import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'

const Search = () => {
  const { searchTerm, isLoading, control, products } = useSearch()

  console.log('prods', JSON.stringify(products, null, 2))

  return (
    <Layout>
      <Heading>Search</Heading>

      <View className='mt-3'>
        <Field<ISearchFormData>
          placeholder='Type something...'
          control={control}
          name='searchTerm'
          keyboardType='web-search'
        />
      </View>
      {!!searchTerm ? (
        <View className='mt-2'>
          {isLoading ? <Loader /> : <Catalog products={products || []} />}
        </View>
      ) : null}
    </Layout>
  )
}

export default Search
