'use strict'

import express from 'express';
import Joi from 'joi';
import { logger, json_validate } from '../utils.js';
import { pool } from '../database/db.js';


const addtogroup = express.Router();

const json_schema = Joi.object({
	ID: Joi.number()
		.positive()
		.integer()
		.required(),
	GroupName: Joi.string()
		.alphanum()
		.max(32)
		.required(),
})

addtogroup.post('/addtogroup', json_validate({ schema: json_schema }), async (req, res) => {
	const { ID } = req.body;
	const { GroupName } = req.body;

	let connection;

	try {
		connection = await pool.getConnection();

		await connection.query('UPDATE Notes SET GroupName = (?) WHERE ID = (?)', [GroupName, ID]);

		res.sendStatus(200);
	} catch (error) {
		logger.log('error', error);
		res.sendStatus(500);
		return;
	} finally {
		if (connection) connection.end;
	}

})

export { addtogroup };
