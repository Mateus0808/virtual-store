
interface InterfaceUsersService {
  userId?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  gender?: string,
  dateBirth?: string,
  password?: string,
  token?: string
  admin: boolean
  emailVerified?: Date
}

interface interfaceLogin {
  email: string,
  password: string
}

export { InterfaceUsersService, interfaceLogin }
