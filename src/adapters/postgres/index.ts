import knex from 'knex';

import config from '../../../config'

const postgresDB = knex(config.postgres)

export default postgresDB;