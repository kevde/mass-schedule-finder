require('ts-node').register({ project: 'tsconfig.json' });
require('tsconfig-paths/register');
require('./src/infrastructure/web/server.ts');
