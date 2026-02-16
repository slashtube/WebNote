'use strict'

import express from 'express';
import Joi from 'joi';
import { pool } from '../database/db.js';
import { json_validate, logger } from '../utils.js';

const deletenote = express.Router();

const json_schema = Joi.object({
	id: Joi.number()
		.positive()
		.integer()
		.required(),

});

deletenote.post('/deletenote', json_validate({ schema: json_schema }), async (req, res) => {
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
		res.sendStatus(500);
		return;
	} finally {
		if (connection) connection.end();
	}

	return;
})

export { deletenote };
