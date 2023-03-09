import { errorHandler } from './utils/error-handler.js';
import express from 'express';
import cors from 'cors';
import apiRouter from './api/api-router.js';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());
app.use('/api/v1', apiRouter);
app.use(errorHandler);
export default app;
