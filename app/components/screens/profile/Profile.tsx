import React from 'react'
import { Image, Text, View } from 'react-native'

import Layout from '@/components/layout/Layout'
import Heading from '@/components/ui/Heading'
import CustomBtn from '@/components/ui/button/Button'

import { useAuth } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { AuthService } from '@/services/auth/auth.service'

import { useProfile } from './useProfile'

const Profile = () => {
  const { setUser } = useAuth()
  const { profile } = useProfile()
  const { navigate } = useTypedNavigation()

  return (
    <Layout>
      <Heading isCenter>Profile</Heading>

      <View className='my-6 items-center justify-center'>
        <Image
          source={{ uri: profile?.avatarPath }}
          className='w-40 h-40 rounded-full'
        />
      </View>

      <CustomBtn className='bg-blue-400' onPress={() => navigate('Pin')}>
        Установить пи код
      </CustomBtn>

      <CustomBtn
        onPress={() => AuthService.logout().then(() => setUser(null))}
        className='h-14'
      >
        Log out
      </CustomBtn>
    </Layout>
  )
}

export default Profile
