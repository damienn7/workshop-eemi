import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import institutionRoutes from './routes/institution.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/institutions', institutionRoutes);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

export default app;
