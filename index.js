import express from 'express';
import path from 'path';
import * as endpoints from './modules.js'
import { logger } from './utils.js'
import { init_db } from './database/db.js';

// Inits database
await init_db();

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use(Object.values(endpoints));

// Render frontend files
app.use(express.static(path.join(import.meta.dirname, "frontend")));


app.listen(port, () => {
	logger.log('info', `listening on http://localhost:${port}`);
})

