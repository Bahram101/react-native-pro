// export const errorCatch = (error: any): string => {
// 	const message = error?.response?.data?.message
// 	return message
// 		? typeof error.response.data.message === 'object'
// 			? message[0]
// 			: message
// 		: error.message
// }

export const errorCatch = (error: any): string => {
  try {
    const message = error?.response?.data?.message

    if (Array.isArray(message)) return message[0]
    if (typeof message === 'string') return message
    if (error?.message) return error.message

    return 'Something went wrong'
  } catch (e) {
    console.log('errorCatch failed:', e)
    console.log('Raw error:', error)
    return 'Unknown error'
  }
}

// import { AxiosError }from 'axios'

// export const errorCatch = (error: unknown): string => {
//   const axiosError = error as AxiosError<any>

//   const message = axiosError?.response?.data?.message

//   if (!message) return axiosError.message

//   if (Array.isArray(message)) {
//     return message[0]
//   }

//   if (typeof message === 'string') {
//     return message
//   }

//   if (typeof message === 'object' && message !== null) {
//     const firstKey = Object.keys(message)[0]
//     return message[firstKey]
//   }

//   return 'Произошла неизвестная ошибка'
// }
