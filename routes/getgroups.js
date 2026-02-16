'use strict'

import express from 'express';
import { pool } from '../database/db.js';

const getgroups = express.Router();

getgroups.get('/getgroups', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const result = await connection.query('SELECT * FROM Groups');

		res.status(200).json(result);
	} catch (error) {
		logger.log('error', error);
		res.sendStatus(500);
		return;

	} finally {
		if (connection) connection.end;
	}

	return;
})


export { getgroups };
