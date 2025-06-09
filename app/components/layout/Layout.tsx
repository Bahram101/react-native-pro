import cn from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'

interface ILayout {
  className?: string
  children: React.ReactNode
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
  return (
    <View className={cn('h-full w-full bg-white mt-1', className)}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  )
}

export default Layout
