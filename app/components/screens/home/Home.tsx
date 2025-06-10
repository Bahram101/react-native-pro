import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import Layout from '@/components/layout/Layout'

import { AuthService } from '@/services/auth/auth.service'

import Header from './Header'
import Banner from './banner/Banner'
import Categories from './categories/Categories'

const Home = () => {
  return (
    <Layout>
      <Header />
      <Banner />
      <Categories />
    </Layout>
  )
}

export default Home
