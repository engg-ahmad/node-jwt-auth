import postgresDB from '../adapters/postgres';

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

async function create (post: any): Promise<any> {
  const record = await postgresDB('posts').insert(post).returning('*');
  return record?.[0]
}

async function update (id: any, post: any): Promise<any> {
  const record = await postgresDB('posts').update(post).where({ id }).returning('*');
  return record?.[0]
}

async function deleteOne (id: any): Promise<any> {
  const record = await postgresDB('posts').delete().where({ id }).returning('*');
  return record?.[0]
}

async function find (userId: any): Promise<any> {
  const records = await postgresDB('posts').select('*').where({ user_id: userId });
  return records
}

export default {
  create,
  update,
  deleteOne,
  find
}