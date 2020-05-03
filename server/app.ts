import express from 'express';
import path from 'path';

const app = express();

app.set('json spaces', 2);
app.use(express.static(path.join(__dirname, '../build')));

export default app;
