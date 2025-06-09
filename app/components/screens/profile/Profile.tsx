import React from 'react'
import { Pressable, Text, View } from 'react-native'

import CustomBtn from '@/components/ui/button/Button'

import { useAuth } from '@/hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import Auth from '../auth/Auth'

const Profile = () => {
  const { setUser } = useAuth()

  return (
    <View className='flex-1 items-center justify-center'>
      <View className='w-10/12 '>
        <Text>Profile</Text>
        <CustomBtn
          onPress={() => AuthService.logout().then(() => setUser(null))}
          className='h-14'
        >
          Log out
        </CustomBtn>
      </View>
    </View>
  )
}

export default Profile
