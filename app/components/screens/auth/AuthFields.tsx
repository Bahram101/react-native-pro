import { FC } from 'react'
import { Control } from 'react-hook-form'

import Field from '@/components/ui/field/Field'

import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from './email.regex'

interface IAuthFields {
  control: Control<IAuthFormData>
  isPassRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ control }) => {

  return (
    <>
      <Field<IAuthFormData>
        placeholder='Enter email'
        keyboardType='email-address'
        control={control}
        name='email'
        rules={{
          required: 'Email is required!',
          pattern: {
            value: validEmail,
            message: 'Please enter a valid email address'
          }
        }}
      />

      <Field<IAuthFormData>
        placeholder='Enter password'
        secureTextEntry
        control={control}
        name='password'
        rules={{
					required: 'Password is required!',
          minLength: {
						value: 6,
            message: 'Password should be minimum 6 characters long'
          }
        }}
      />
    </>
  )
}

export default AuthFields
