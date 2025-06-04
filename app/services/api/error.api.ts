import { AxiosError } from 'axios'

export const errorCatch = (error: unknown): string => {
  const axiosError = error as AxiosError<any>

  const message = axiosError?.response?.data?.message

  if (!message) return axiosError.message

  if (Array.isArray(message)) {
    return message[0]
  }

  if (typeof message === 'string') {
    return message
  }

  if (typeof message === 'object' && message !== null) {
    const firstKey = Object.keys(message)[0]
    return message[firstKey]
  }

  return 'Произошла неизвестная ошибка'
}