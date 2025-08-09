import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'

import BottomMenu from '@/components/layout/bottom-menu/BottomMenu'

import { useAuth } from '@/hooks/useAuth'

import PrivateNavigator from './PrivateNavigator'
import { useCheckAuth } from '@/providers/auth/useCheckAuth'

const Navigation = () => {
  const { user } = useAuth()

  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined
  )
  const navRef = useNavigationContainerRef()

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name)
    const listener = navRef.addListener('state', () =>
      setCurrentRoute(navRef.getCurrentRoute()?.name)
    )
    return () => navRef.removeListener('state', listener)
  }, [])

  useCheckAuth(currentRoute)

  return (
    <>
      <NavigationContainer ref={navRef}>
        <PrivateNavigator />
      </NavigationContainer>
      {user && currentRoute && (
        <BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
      )}
    </>
  )
}

export default Navigation
