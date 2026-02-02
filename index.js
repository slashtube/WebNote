import express from 'express';
import path from 'path';
import { addnote } from './routes/addnote.js'
import { init_db } from './database/db.js';

// Inits database
await init_db();

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use(addnote);

// Render frontend files
app.use(express.static(path.join(import.meta.dirname, "frontend")));


app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
})
