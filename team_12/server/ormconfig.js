const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const { DATABASE_URL, NODE_ENV } = require('./environment');

module.exports = {
  type: 'postgres',
  url: DATABASE_URL,
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  seeds: ['dist/**/*.seeder.js'],
  factories: ['dist/**/*.factory.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'typeorm_migration',
  extra: {
    ...(NODE_ENV === 'production' && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  },
};
