import express from 'express';
import { calculateBmi, parsedArgsBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (req.query.height && req.query.weight) {
    const params: parsedArgsBmi = {
      height: Number(req.query.height),
      weight: Number(req.query.weight),
    };

    if (!isNaN(params.height) && !isNaN(params.weight)) {
      return res.json({ ...params, bmi: calculateBmi(params) });
    }

    return res.send({ error: 'malformatted parameters' });
  }

  return res.send({ error: 'malformatted parameters' });
});

//eslint-disable-next-line
const containsOnlyNumbers = (args: Array<any>): boolean => {
  let onlyNums = true;
  for (let i = 0; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      onlyNums = false;
      break;
    }
  }

  return onlyNums;
};

app.post('/exercises', (req, res) => {
  if (req.body.daily_exercises && req.body.target) {
    if (
      Array.isArray(req.body.daily_exercises) &&
      containsOnlyNumbers(req.body.daily_exercises)
    ) {
      if (typeof req.body.target === 'number') {
        return res.json(
          calculateExercises(req.body.daily_exercises, req.body.target)
        );
      }
      return res.send({ error: 'malformatted parameters' });
    }
    return res.send({ error: 'malformatted parameters' });
  }
  return res.send({ error: 'parameters missing' });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
