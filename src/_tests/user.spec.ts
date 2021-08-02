import { Connection, getConnection, getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import request from 'supertest'

import '../database'
import app from '../index'

describe('User Service', () => {
  let connection: Connection

  const dateBirthFormat = new Date('1998-08-05')
  const users = [
    {
      firstName: 'Mateus',
      lastName: 'Santos',
      email: 'mateus@gmail.com',
      phone: '84 99998-8978',
      gender: 'Masculino',
      dateBirth: dateBirthFormat,
      password: 'Mateus@0',
      avatar: 'url',
      emailVerified: '2021-08-08',
      admin: false
    }
  ]

  beforeEach(async () => {
    connection = getConnection()
    await connection.connect()
  })

  afterEach(async () => {
    const entities = connection.entityMetadatas

    for (const entity of entities) {
      const repository = connection.getRepository(entity.name)
      await repository.query('TRUNCATE TABLE ' + entity.tableName + ' CASCADE;')
    }
    await connection.close()
  })

  it('User add and ruturn status code 201', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        firstName: 'Adelson',
        lastName: 'Nunes',
        email: 'adelson@gmail.com',
        phone: '87 98945-9994',
        gender: 'Masculino',
        dateBirth: '1998-08-05',
        password: 'Adelson@123',
        emailVerified: '2021-08-08',
        admin: false
      })
    expect(response.status).toBe(201)
  })

  it('Add user and return same object', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        firstName: 'João',
        lastName: 'Soares',
        email: 'joaomaiu@gmail.com',
        phone: '(89) 99894-9456',
        gender: 'Masculino',
        dateBirth: '1998-08-05',
        password: 'Joao@123',
        emailVerified: '2021-08-08',
        admin: false
      })
    expect(response.body.user.email).toBe(users[0].email)
  })

  it('User add', async () => {
    const userRepository = getCustomRepository(UserRepository)

    const user = userRepository.create({
      firstName: 'Ferreira',
      lastName: 'Ferreira',
      email: 'vitoria@gmail.com',
      phone: '99 9 9999-999',
      gender: 'Feminino',
      dateBirth: '1999-11-15',
      password: 'vitoria',
      emailVerified: '2021-08-08',
      admin: false
    })

    await userRepository.save(user)
    expect(user.email).toEqual('vitoria@gmail.com')
  })
})
