const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Users',
    password: 'Meenakshi26',
    port: 5432
});

module.exports = pool;