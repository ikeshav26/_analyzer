import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './src/config/DB.js';


dotenv.config();

const app = express();
connectDb();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
