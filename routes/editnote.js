'use strict'

import express from 'express';
import Joi from 'joi';
import { format } from 'fecha';
import { pool } from '../database/db.js';
import { json_validate, logger } from '../utils.js';

const editnote = express.Router();

const json_schema = Joi.object({
	id: Joi.number()
		.positive()
		.integer()
		.required(),
	name: Joi.string()
		.alphanum()
		.min(1)
		.max(32)
		.required(),
	groupID: Joi.number()
		.integer()
		.positive(),
	content: Joi.string()
		.max(256),
}

);

editnote.post("/editnote", json_validate({ schema: json_schema }), async (req, res) => {
	const { id } = req.body;
	const { name } = req.body;
	const { groupID } = req.body;
	const { content } = req.body;

	// Gets current date
	const LastModify = format(Date.now(), 'YYYY-MM-DD HH:mm:ss');

	let connection;
	try {
		connection = await pool.getConnection();

		await connection.query("UPDATE Notes SET Name=(?), GroupID = (?), Content=(?), LastModify=(?) WHERE ID=(?)",
			[name, groupID, content, LastModify, id]
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

export { editnote };
