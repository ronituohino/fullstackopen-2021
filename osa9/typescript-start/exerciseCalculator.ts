const targetDailyHours = [2, 2, 0, 2, 2, 0, 0];

const averageOfArr = (arr: Array<number>): number => {
  return arr.reduce((acc, cv) => acc + cv, 0) / arr.length;
};

const getRating = (average: number, target: number): [number, string] => {
  switch (true) {
    case average < target:
      return [
        1,
        'You are a horrible person, and you need to get your s@*# together.',
      ];
    case average >= target && average < target * 2:
      return [2, 'Yeah yeah good job and whatever...'];
    case average >= target * 2:
      return [3, 'Honestly that is great. Good Job.'];
  }

  return [1, 'error'];
};

interface ExerciseStatistics {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHoursPerDay: Array<number>
): ExerciseStatistics => {
  const target = averageOfArr(targetDailyHours);
  const average = averageOfArr(exerciseHoursPerDay);
  const [rating, ratingDescription] = getRating(average, target);

  return {
    periodLength: exerciseHoursPerDay.length,
    trainingDays: exerciseHoursPerDay.filter((d) => d > 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseInputExercise = (args: Array<string>): Array<number> => {
  let exerciseHoursPerDay: Array<number> = [];

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      exerciseHoursPerDay.push(Number(args[i]));
    } else {
      throw new Error(`Provided values were not numbers: "${args[i]}"`);
    }
  }

  return exerciseHoursPerDay;
};

try {
  console.log(calculateExercises(parseInputExercise(process.argv)));
} catch (e) {
  console.log('Something went wrong: ', e.message);
}
