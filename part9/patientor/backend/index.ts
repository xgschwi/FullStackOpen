import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnoses';

const app = express();

// eslint-disable-next-line 
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});