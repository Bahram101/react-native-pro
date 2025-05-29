import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'

type Props = {}

const Loader: FC = (props: Props) => {
  return <ActivityIndicator size='large' color='#47AA52' />
}

export default Loader
