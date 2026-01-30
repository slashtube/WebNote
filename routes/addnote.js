'use strict';

import express from 'express';

const addnote = express.Router();

addnote.get("/addnote", (req, res) => {
	console.log(req);
	res.send("200");
});

export { addnote };

