import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import Loader from '@/components/ui/Loader'
import CustomBtn from '@/components/ui/button/Button'

import { IAuthFormData } from '@/types/auth.interface'

import AuthFields from './AuthFields'
import { useAuthMutations } from './useAuthMutations'

const Auth: FC = () => {
  const [isReg, setIsReg] = useState(false)
  const { handleSubmit, control, reset } = useForm<IAuthFormData>({
    mode: 'onChange'
  })

  const { isLoading, loginSync, registerSync } = useAuthMutations(reset)

  const onSubmit: SubmitHandler<IAuthFormData> = data => { 
    if(isReg) registerSync(data)
    else loginSync(data)
  }

  return (
    <View className='flex-1 items-center justify-center'>
      <View className='w-10/12'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Text className='text-2xl mt-10 text-center'>
              {isReg ? 'Sign up' : 'Sign in'}
            </Text>
            
            <AuthFields control={control} />

            <CustomBtn onPress={handleSubmit(onSubmit)} className='h-14'>
              {isReg ? 'Sign up' : 'Sign in'}
            </CustomBtn>

            <Pressable onPress={() => setIsReg(!isReg)}>
              <Text className='text-black text-center text-base mt-6 flex'>
                {isReg
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <Text className='text-[#47AA52] flex'>
                  {isReg ? 'Login' : 'Sign up'}
                </Text>
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  )
}

export default Auth
