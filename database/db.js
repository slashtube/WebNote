import mariadb from 'mariadb';
import path from 'path';

process.loadEnvFile(path.join(import.meta.dirname, 'db.env'));

const pool = mariadb.createPool({
	database: process.env.DATABASE,
	host: process.env.HOST,
	user: process.env.DBUSER,
	password: process.env.PASSWORD,
	connectionLimit: 5
});

async function init_db() {
	try {
		await mariadb.importFile({
			database: process.env.DATABASE,
			host: process.env.HOST,
			user: process.env.DBUSER,
			password: process.env.PASSWORD,
			file: path.join(import.meta.dirname, 'setup_db.sql')
		});

		console.log("DB setup successfully!");

	} catch (error) {
		console.log(error);
	}


}

export { pool, init_db };
