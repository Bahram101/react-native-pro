import { useQuery } from '@tanstack/react-query'

import { UserService } from '@/services/user.service'

export const useProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => UserService.getProfile(),
    // select: ({ data }) => {
    //   return data
    // },
  })

  return { profile, isLoading }
}
