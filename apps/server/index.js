import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './src/config/DB.js';
import authRoutes from './src/routes/auth.routes.js';
import oauthRoutes from './src/routes/oauth.routes.js';
import newsRoutes from './src/routes/news.routes.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/user/auth',authRoutes);
app.use('/api/auth', oauthRoutes);
app.use('/api/news', newsRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
