const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
	encrypt: true, // Use encryption
	enableArithAbort: true,
	trustServerCertificate: true, // Disable certificate validation
	authentication: {
		type: 'default',
		options: {
			userName: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
	},
  },
};

async function queryDatabase(query: string) {
  try {
	let pool = await sql.connect(config);
	let result = await pool.request().query(query);
	return result.recordset;
  } catch (err) {
	console.error('SQL error', err);
  }
}

module.exports = {
  queryDatabase,
};