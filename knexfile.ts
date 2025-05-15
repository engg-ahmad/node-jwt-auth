import config from './config'
const { client, connection } = config.postgres
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client,
    connection: {
      user: connection.user,
      password: connection.password,
      host: connection.host,
      database: connection.database
    },
    migrations: {
      tableName: 'knex_migrations',
      disableMigrationsListValidation: true
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client,
    connection: {
      database: connection.database,
      host: connection.host,
      user: connection.user,
      password: connection.password,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
