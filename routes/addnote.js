'use strict';

import express from 'express';
import { pool } from '../database/db.js'
import { format } from 'fecha';

const addnote = express.Router();

addnote.post("/addnote", async (req, res) => {
	const { name } = req.body;
	const { groupID } = req.body;
	const { content } = req.body;

	// TODO: sanity check on the body fields

	// Checks if there's a name
	if (!name) {
		res.sendStatus(400).send("Bad Request");
		return;
	}

	// Gets current date
	const creation = format(Date.now(), 'YYYY-MM-DD HH:mm:ss');


	// DB connection
	let connection;
	try {
		connection = await pool.getConnection();

		console.log(creation);

		const result = await connection.query("INSERT INTO Notes (Name, GroupID, Content, Creation, LastModify) VALUES (?, ?, ?, ?, ?)",
			[name, groupID, content, creation, creation]
		);

		// Debugging
		console.log(result);
		res.sendStatus(200);

	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	} finally {
		if (connection) connection.release();
	}

	return;
});

export { addnote };

