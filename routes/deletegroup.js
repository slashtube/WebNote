'use strict'

import express from 'express';
import Joi from 'joi';
import { logger } from '../index.js';
import { pool } from '../database/db.js';

const deletegroup = express.Router();

const schema = Joi.object({
	name: Joi.string()
		.max(32)
		.required(),
})

deletegroup.post('/deletegroup', async (req, res) => {
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

		await connection.query('DELETE FROM Groups WHERE Name=(?)', name);

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

export { deletegroup };
