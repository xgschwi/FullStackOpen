import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';

const app = express();

// eslint-disable-next-line 
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});