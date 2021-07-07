import { createConnection /* getConnectionOptions , Connection */ } from 'typeorm'

createConnection()
// let connection: Connection

// const createTypeORMConnection = async () => {
//   const connectionOptions = await getConnectionOptions(process.env.NODE_ENV!)
//   connection = await createConnection({ ...connectionOptions, name: 'default' })
//   return connection
// }

// createTypeORMConnection()
