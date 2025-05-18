import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth'
import postRoutes from './routes/post'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});