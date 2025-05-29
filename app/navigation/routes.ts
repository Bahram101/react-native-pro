import Auth from '@/components/screens/auth/Auth'

import { IRoute } from './navigation.types'
import Home from '@/Home'

export const routes: IRoute[] = [
  {
    name: 'Auth',
    component: Auth
  },
  {
    name: 'Home',
    component: Home
  }
]
