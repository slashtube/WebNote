'use strict';

import express from 'express';
import { pool } from '../database/db.js'
import { format } from 'fecha';
import { logger } from '../index.js';
import Joi from 'joi';


const schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(1)
		.max(32)
		.required(),
	groupID: Joi.number()
		.integer()
		.positive(),
});

const addnote = express.Router();

addnote.post("/addnote", async (req, res) => {

	const { error } = schema.validate(req.body);
	if (error) {
		logger.log('error', error);
		res.sendStatus(400);
		return;
	}

	const { name } = req.body;
	const { groupID } = req.body;

	// Gets current date
	const creation = format(Date.now(), 'YYYY-MM-DD HH:mm:ss');

	// DB connection
	let connection;
	try {
		connection = await pool.getConnection();

		await connection.query("INSERT INTO Notes (Name, GroupID, Content, Creation, LastModify) VALUES (?, ?, ?, ?, ?)",
			[name, groupID, null, creation, creation]
		);

		res.sendStatus(200);

	} catch (err) {
		logger.log('error', err);
		res.sendStatus(500);
	} finally {
		if (connection) connection.release();
	}

	return;
});

export { addnote };

