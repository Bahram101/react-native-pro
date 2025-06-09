import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import AuthProvider from '@/providers/auth/AuthProvider'

import Navigation from '@/navigation/Navigation'

import './global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode='light'>
        <AuthProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar style='auto' />
            <Toast />
          </SafeAreaProvider>
        </AuthProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  )
}
