'use strict';

import express from 'express';
import Joi from 'joi';
import { pool } from '../database/db.js'
import { format } from 'fecha';
import { json_validate, logger } from '../utils.js';


const json_schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(1)
		.max(32)
		.required(),
	GroupName: Joi.string()
		.alphanum()
		.max(32)
});

const addnote = express.Router();

addnote.post("/addnote", json_validate({ schema: json_schema }), async (req, res) => {
	const { name } = req.body;
	const { GroupName } = req.body;

	// Gets current date
	const creation = format(Date.now(), 'YYYY-MM-DD HH:mm:ss');

	// DB connection
	let connection;
	try {
		connection = await pool.getConnection();

		await connection.query("INSERT INTO Notes (Name, GroupName, Content, Creation, LastModify) VALUES (?, ?, ?, ?, ?)",
			[name, GroupName, null, creation, creation]
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

