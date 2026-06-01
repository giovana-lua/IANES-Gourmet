const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin1234',
        database: 'db_doceria',
        port: 3306
    },
    //gerenciamneto de conexões 
    pool: {min: 0, max: 10}
});

module.exports = db;