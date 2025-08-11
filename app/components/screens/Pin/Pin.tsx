import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

import { Button } from '@/components/ui/button'
import CustomBtn from '@/components/ui/button/Button'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const Pin = () => {
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const { navigate } = useTypedNavigation()

  const handleSave = async () => {
    if (pin.length !== 4) {
      alert('PIN должен состоять из 4 цифр')
      return
    }
    if (pin !== confirmPin) {
      alert('PIN коды не совпадают')
      return
    }
    // await savePinCode(pin)
    navigate('Home')
  }
  return (
    <View className='flex-1 justify-center items-center '>
      <View>
        <Text>Введите новый PIN</Text>
        <TextInput
          value={pin}
          onChangeText={setPin}
          secureTextEntry
          keyboardType='numeric'
          maxLength={4}
        />
        <Text>Подтвердите PIN</Text>
        <TextInput
          value={confirmPin}
          onChangeText={setConfirmPin}
          secureTextEntry
          keyboardType='numeric'
          maxLength={4}
        />
        <CustomBtn onPress={handleSave}>Сохранить</CustomBtn>
      </View>
    </View>
  )
}

export default Pin
