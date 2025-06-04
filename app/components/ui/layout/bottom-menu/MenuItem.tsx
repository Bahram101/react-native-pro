import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { Pressable, View } from 'react-native'

import { IMenuItem, TypeNavigate } from './menu.interface'

interface IMenuItemProps {
  item: IMenuItem
  nav: TypeNavigate
  currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
  const isActive = currentRoute === item.path

  return (
    <Pressable onPress={() => nav(item.path)}>
      <Feather
        name={item.iconName}
        size={26}
        color={isActive ? '#47AA52' : '#374151'}
      />
    </Pressable>
  )
}

export default MenuItem
