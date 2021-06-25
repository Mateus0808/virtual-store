import { Connection, getConnection, getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import '../database'

describe('User Service', () => {
  let connection: Connection

  beforeAll(async () => {
    connection = await getConnection()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('User add', async () => {
    const userRepository = await getCustomRepository(UserRepository)

    const user = await userRepository.create({
      firstName: 'trtrt',
      lastName: 'dos fdfdfd',
      email: 'h@gmail.com',
      phone: '99 9 9999-999',
      gender: 'Masculino',
      dateBirth: '1998-08-05',
      password: '12345689'
    })

    await userRepository.save(user)

    expect(user.email).toEqual('h@gmail.com')
  })
})
