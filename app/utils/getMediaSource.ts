import { SERVER_URL } from '@/config/api.config'

export const getMediaSource = (path: string) => {
  return {
    uri: SERVER_URL + path
  }
}
