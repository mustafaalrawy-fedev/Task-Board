import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import tasksRoutes from './routes/tasksRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '../frontend/dist')));

app.use('/api/task', tasksRoutes);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '../frontend/dist/index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
