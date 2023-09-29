import { createPool } from 'mysql2/promise'

export const conn = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ueba-2013',
  port: '3306',
  database: 'db_events'
})