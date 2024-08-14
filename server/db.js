const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "fT9Y14FC9_",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;