import express from 'express';
import { calculateBmi, parsedArgsBmi } from './bmiCalculator';

const app = express();

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

    return res.send({ error: 'Parameters are not numbers!' });
  }

  return res.send({ error: 'Height or weight undefined in query parameters.' });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
