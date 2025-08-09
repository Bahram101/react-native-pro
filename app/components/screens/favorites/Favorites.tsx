import React from 'react'

import Layout from '@/components/layout/Layout'
import Catalog from '@/components/ui/catalog/Catalog'

import { useProfile } from '../profile/useProfile'

const Favorites = () => {
  const { profile } = useProfile()
  return (
    <Layout>
      <Catalog title='Favorites' products={profile?.favorites || []} />
    </Layout>
  )
}

export default Favorites
