import postgresDB from '../adapters/postgres';

interface User {
    email: string;
    password: string;
}

async function createUser (user: User): Promise<any> {
  const record = await postgresDB('users').insert(user).returning('*');
  return record?.[0]
}

async function getUserByEmail (email: string): Promise<any> {
  const record = await postgresDB('users').select('*').where({ email });
  return record?.[0]
}

export default {
  createUser,
  getUserByEmail
}