import express from 'express';
import Joi from 'joi';
import { pool } from '../database/db.js';
import { json_validate, logger } from '../utils.js';

const json_schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.max(32)
		.required(),
});

const addgroup = express.Router();

addgroup.post('/addgroup', json_validate({ schema: json_schema }), async (req, res) => {
	const { name } = req.body;

	let connection;
	try {
		connection = await pool.getConnection();

		await connection.query('INSERT INTO Groups (Name) VALUES (?)', name);

		res.sendStatus(200);
	} catch (error) {
		logger.log('error', error);
		res.sendStatus(400);
		return;
	} finally {
		if (connection) connection.end();
	}

	return;
})

export { addgroup }
