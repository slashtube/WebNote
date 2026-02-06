'use strict'

import express from 'express';
import Joi from 'joi';
import { pool } from '../database/db.js';

const deletenote = express.Router();

const schema = Joi.object({
	id: Joi.number()
		.positive()
		.integer()
		.required(),

});

deletenote.post('/deletenote', async (req, res) => {

	const { error } = schema.validate(req.body);
	if (error) {
		logger.log('error', error);
		return;
	}

	const { id } = req.body;

	let connection;
	try {
		connection = await pool.getConnection();

		await connection.query("DELETE FROM Notes WHERE ID=(?)",
			[id]
		);

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

export { deletenote };
