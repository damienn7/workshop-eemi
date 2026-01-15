import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import institutionRoutes from './routes/institution.routes';
import { institutionContext } from './middlewares/institutionContext.middleware';
import trainingRoutes from './routes/training.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(institutionContext);

app.use('/auth', authRoutes);
app.use('/institutions', institutionRoutes);
app.use('/trainings', trainingRoutes); // Assuming userRoutes is similar to institutionRoutes
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

export default app;
