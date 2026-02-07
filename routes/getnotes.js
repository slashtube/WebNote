'use strict'

import express from 'express';
import { pool } from '../database/db.js'
import { logger } from '../index.js';

const getnotes = express.Router();


getnotes.get('/getnotes', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();

		await connection.query("SELECT * FROM Notes");

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


export { getnotes };
