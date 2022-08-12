const knex = require('knex')({
	client: 'pg',
	connection: process.env.DB_CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false
	}
})

module.exports = knex
