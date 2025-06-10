import { SERVER_URL } from '@/config/api.config'

export const getMediaSource = (path: string) => {
	console.log('server url', SERVER_URL)
	console.log('path', path)
  return {
    uri: SERVER_URL + path
  }
}
