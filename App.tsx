import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Button, ButtonText } from '@/components/ui/button'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'

import './global.css'
import Home from '@/Home'

export default function App() {
  const [isEnabled, setIsEnabled] = useState(true)

  const toggleSwitch = (e: boolean) => {
    setIsEnabled(e)
  }
  return (
    <GluestackUIProvider mode='light'>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-purple-400 text-2xl font-bold'>HELLO!</Text>
        <Home />
        <Button>
          <ButtonText>Click</ButtonText>
        </Button>
        <View className='w-7/12 mt-4' >
          <Input>
            <InputField />
            <InputSlot>
              <InputIcon>{/* Some Icon Component */}</InputIcon>
            </InputSlot>
          </Input>
        </View>
        <Switch
          className='mt-4'
          // size='lg'
          style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
          value={isEnabled}
          onValueChange={toggleSwitch}
          disabled={false}
          trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
          thumbColor={colors.neutral[50]}
          // activeThumbColor={colors.neutral[50]}
          ios_backgroundColor={colors.red[300]}
          // android_backgroundColor={colors.blue[800]}
        />
        <StatusBar style='auto' />
      </View>
    </GluestackUIProvider>
  )
}
