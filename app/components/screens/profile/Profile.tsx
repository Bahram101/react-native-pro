import React from 'react'
import { Image, Text, View } from 'react-native'

import Heading from '@/components/ui/Heading'
import CustomBtn from '@/components/ui/button/Button'

import { useAuth } from '@/hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import { useProfile } from './useProfile'

const Profile = () => {
  const { setUser } = useAuth()
  const { profile } = useProfile()

  return (
    <View className='flex-1 items-center justify-center'>
      <Heading isCenter>Profile</Heading>

      <View className='my-6 items-center justify-center'>
        <Image
          source={{ uri: profile?.avatarPath }}
          className='w-40 h-40 rounded-full'
        />
      </View>

      <CustomBtn
        onPress={() => AuthService.logout().then(() => setUser(null))}
        className='h-14'
      >
        Log out
      </CustomBtn>
    </View>
  )
}

export default Profile
