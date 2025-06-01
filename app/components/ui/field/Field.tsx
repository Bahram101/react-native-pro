import cn from 'clsx'
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

import { Input, InputField } from '../input'

import { IField } from './field.interface'

const Field = <T extends Record<string, any>>({
  control,
  rules,
  name,
  className,
  ...rest
}: IField<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <>
          {/* <View
            className={cn(
              'bg-white border rounded-lg pb-4 pt-2.5 px-4 my-1.5',
              error ? 'border-red-500' : 'border-gray-400'
            )}
          >
            <TextInput
              autoCapitalize='none'
              onChangeText={onChange}
              onBlur={onBlur}
              value={(value || '').toString()}
              className='text-black text-base'
              placeholderTextColor='#6A6A6A'
              {...rest}
            />
          </View> */}

          <Input
            className={cn(
              'mb-2 mt-4 bg-white h-14 rounded-lg',
              error ? 'border-red-400' : 'border-gray-400'
            )}
            {...rest}
          >
            <InputField
              placeholder='Enter Text here...'
              className='h-12'
              onChangeText={onChange}
              value={(value || '').toString()}
              autoCapitalize='none'
              onBlur={onBlur}
              placeholderTextColor='#6A6A6A'
            />
          </Input>
          {error && <Text className='text-red-400'>{error.message}</Text>}
        </>
      )}
    />
  )
}

export default Field
