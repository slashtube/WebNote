'use strict'

import express from 'express';
import Joi from 'joi';
import { pool } from '../database/db.js';
import { json_validate, logger } from '../utils.js';

const deletegroup = express.Router();

const json_schema = Joi.object({
	name: Joi.string()
		.max(32)
		.required(),
})

deletegroup.post('/deletegroup', json_validate({ schema: json_schema }), async (req, res) => {
	const { name } = req.body;

	let connection;
	try {

		connection = await pool.getConnection();

		await connection.query('DELETE FROM Groups WHERE Name=(?)', name);

		res.sendStatus(200);
	} catch (error) {
		logger.log('error', error);
		res.sendStatus(500);
		return;
	} finally {
		if (connection) connection.end();

	}

	return;
})

export { deletegroup };
