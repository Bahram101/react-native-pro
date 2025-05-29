import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import Navigation from '@/navigation/Navigation'

import './global.css'

export default function App() {
  return (
    <GluestackUIProvider mode='light'>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}
