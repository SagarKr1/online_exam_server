const { Pool } = require('pg');

// Create a new client
const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'aisect',
    password: 'admin',
    port: 5432, // Default PostgreSQL port
});

module .exports = client;
