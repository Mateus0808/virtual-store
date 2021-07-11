import { createConnection, getConnectionOptions } from 'typeorm'

const createConnectionTypeORM = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
  const connection = await createConnection({ ...connectionOptions, name: 'default' })
  return connection
}

createConnectionTypeORM()
