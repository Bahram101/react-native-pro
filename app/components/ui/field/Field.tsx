import cn from 'clsx'
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Text } from 'react-native'

import { Input, InputField } from '../input'

import { IField } from './field.interface'

const Field = <T extends Record<string, any>>({
  control,
  name,
  rules,
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
      }) => {

        return (
          <>
            <Input
              className={cn(
                'mt-4 bg-white h-14 rounded-lg',
                error ? 'border-red-400' : 'border-gray-400'
              )}
            >
              <InputField
                value={(value || '').toString()}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize='none'
                placeholderTextColor='#6A6A6A'
                {...rest}
              />
            </Input>
            {error && <Text className='text-red-400'>{error.message}</Text>}
          </>
        )
      }}
    />
  )
}

export default Field
