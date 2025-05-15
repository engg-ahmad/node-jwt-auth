import dotenv from 'dotenv';
dotenv.config();

const config = {
  postgres: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASS,
      database: process.env.POSTGRES_DB_NAME,
      host: process.env.POSTGRES_LOCAL_INSTANCE, port: 5432
    },
  },
}

export default config;