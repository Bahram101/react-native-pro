import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import Loader from '@/components/ui/Loader'
// import { Button, ButtonText } from '@/components/ui/button'

import { IAuthFormData } from '@/types/auth.interface'

import Buttonn from '@/components/ui/button/Button' 

const Auth: FC = () => {
  const [isReg, setIsReg] = useState(false)
  const { handleSubmit, reset, control } = useForm<IAuthFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IAuthFormData> = data => {
    console.log('onSubmit', data)
  }

  const isLoading = false

  return (
    <View className='flex-1 items-center justify-center'>
      <View className='w-10/12 '>
        <Text className='text-2xl mt-10 text-center'>
          {isReg ? 'Sign up' : 'Sign in'}
        </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* {Auth Fields} */}

            <Buttonn
              onPress={handleSubmit(onSubmit)}
              className=''
            >
              {isReg ? 'Sign up' : 'Sign in'} 
            </Buttonn>

            <Pressable onPress={() => setIsReg(!isReg)}>
              <Text className='text-black text-center text-base mt-6 flex  '>
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
