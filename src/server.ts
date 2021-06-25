import 'reflect-metadata'
import app from './index'
import './database'

app.listen(3333, () => {
  console.log('Servr is run')
})
