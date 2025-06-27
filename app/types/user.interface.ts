import { IProduct } from './product.interface'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  avatarPath: string
  favorites: IProduct[]
}
