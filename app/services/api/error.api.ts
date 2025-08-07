export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}


// export const errorCatch = (error: any): { message: string; statusCode?: number } => {
// 	console.log('errorCatchRes', JSON.stringify(error.response, null, 2))

// 	const res = error?.response
// 	const message = res?.data?.message
// 	const statusCode = res?.data?.statusCode

// 	const parsedMessage = message
// 		? typeof message === 'object'
// 			? message[0]
// 			: message
// 		: error.message

// 	return { message: parsedMessage, statusCode }
// }


// export const errorCatch = (error: any): string => {
//   try {
//     const message = error?.response?.data?.message

//     if (Array.isArray(message)) return message[0]
//     if (typeof message === 'string') return message
//     if (error?.message) return error.message

//     return 'Something went wrong'
//   } catch (e) {
//     return 'Unknown error'
//   }
// }

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
