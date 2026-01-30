import express from 'express';
import path from 'path';
import { addnote } from './routes/addnote.js'

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use(addnote);

app.use(express.static(path.join(import.meta.dirname, "frontend")));


app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
})
