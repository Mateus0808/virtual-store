import { Connection, getConnection, getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import request from 'supertest'

import '../database'
import app from '../index'

describe('User Service', () => {
  let connection: Connection
  const users = [
    {
      firstName: 'joao',
      lastName: 'santos',
      email: 'joao@gmail.com',
      phone: '99 9 9999-999',
      gender: 'Masculino',
      dateBirth: '1998-08-05',
      password: '12345689'
    }
  ]

  beforeEach(async () => {
    connection = await getConnection()
    await connection.connect()
  })

  afterEach(async () => {
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

  it('User add and ruturn status code 201', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        firstName: 'mateus',
        lastName: 'santos',
        email: 'mateus@gmail.com',
        phone: '99 9 9999-999',
        gender: 'Masculino',
        dateBirth: '1998-08-05',
        password: '12345689'
      })

    expect(response.status).toBe(201)
  })

  it('User add and ruturn status code 201', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        firstName: 'joao',
        lastName: 'santos',
        email: 'joao@gmail.com',
        phone: '99 9 9999-999',
        gender: 'Masculino',
        dateBirth: '1998-08-05',
        password: '12345689'
      })

    expect(response.body).toMatchObject(users[0])
  })
})
