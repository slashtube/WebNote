import express from 'express';
import path from 'path';
import { createLogger, transports, format } from 'winston';
import { addnote } from './routes/addnote.js'
import { getnotes } from './routes/getnotes.js';
import { editnote } from './routes/editnote.js';
import { deletenote } from './routes/deletenote.js';
import { addgroup } from './routes/addgroup.js';
import { deletegroup } from './routes/deletegroup.js';
import { init_db } from './database/db.js';

// Inits Logger
// TODO: add logging to file
const logger = createLogger({
	format: format.combine(
		format.json(),
		format.splat(),
		format.simple(), // remove after debugging
		format.errors({ stack: true }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
	),
	transports: [
		new transports.Console()
	]
})

// Inits database
await init_db();

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use(addnote);
app.use(getnotes);
app.use(editnote);
app.use(deletenote);
app.use(addgroup);
app.use(deletegroup);

// Render frontend files
app.use(express.static(path.join(import.meta.dirname, "frontend")));


app.listen(port, () => {
	logger.log('info', `listening on http://localhost:${port}`);
})

export { logger };
