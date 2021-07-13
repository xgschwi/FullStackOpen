import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBmi([height, weight]);

    res.json({
      height,
      weight,
      bmi
    });
  }
  catch(e) { 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.message === 'Height and Weight cannot be 0') {
      res.status(400).json({
        error: 'Height and Weight cannot be 0'
      });
    }
    else res.status(400).json({
      error: 'Parameters Missing'
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises;
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(isNaN(daily_exercises[0]) || isNaN(target))
      throw new Error('Parameters Missing');

    const result = calculateExercises(daily_exercises, target);
    
    res.json(result);
  }
  catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.message === 'Malformatted Parameters') {
      res.status(400).json({
        error: 'Malformatted Parameters'
      });
    }
    else res.status(400).json({
      error: 'Parameters Missing'
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});