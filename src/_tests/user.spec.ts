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
      name: 'João Soares',
      email: 'joaomaiu@gmail.com',
      phone: '(87) 99845-4545',
      gender: 'Masculino',
      dateBirth: dateBirthFormat,
      password: 'joao'
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
        name: 'Adelson Nunes',
        email: 'adelson@gmail.com',
        phone: '87 98945-9994',
        gender: 'Masculino',
        dateBirth: '1998-08-05',
        password: 'Adelson@123'
      })
    expect(response.status).toBe(201)
  })

  it('Add user and return same object', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'João Soares',
        email: 'joaomaiu@gmail.com',
        phone: '(89) 99894-9456',
        gender: 'Masculino',
        dateBirth: '1998-08-05',
        password: 'Joao@123'
      })
    expect(response.body.user.email).toBe(users[0].email)
  })

  it('User add', async () => {
    const userRepository = getCustomRepository(UserRepository)

    const user = userRepository.create({
      name: 'Vitoria Ferreira',
      email: 'vitoria@gmail.com',
      phone: '99 9 9999-999',
      gender: 'Feminino',
      dateBirth: '1999-11-15',
      password: 'vitoria'
    })

    await userRepository.save(user)
    expect(user.email).toEqual('vitoria@gmail.com')
  })
})
