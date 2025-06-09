import cn from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import { Pressable, Text } from 'react-native'

import { Button, ButtonText } from '@/components/ui/button'

import { IButton } from './button.interface'

const CustomBtn: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  console.log('rest', rest)
  return (
    <Button className={cn('bg-primary w-full mt-4 rounded-lg', className)} {...rest}>
      <ButtonText className='text-white text-center font-medium text-lg'>
        {children}
      </ButtonText>
    </Button>
  )
}

export default CustomBtn
