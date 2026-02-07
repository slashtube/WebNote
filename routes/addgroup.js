import express from 'express';
import Joi from 'joi';
import { logger } from '../index.js';
import { pool } from '../database/db.js';

const schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.max(32)
		.required(),

});

const addgroup = express.Router();

addgroup.post('/addgroup', async (req, res) => {
	const { error } = schema.validate(req.body);

	if (error) {
		logger.log('error', error);
		res.sendStatus(400);
		return;
	}

	const { name } = req.body;

	let connection;
	try {
		connection = await pool.getConnection();

		connection.query('INSERT INTO Groups (Name) VALUES (?)', name);

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
