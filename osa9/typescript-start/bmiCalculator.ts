const calculateBmi = ({height, weight}: parsedArgsBmi): string => {
  const bmi = (weight / height / height) * 10000

  switch (true) {
    case bmi < 18.5:
      return 'Underweight (unhealthy weight)'
    case (bmi >= 18.5 && bmi < 25) :
      return 'Normal (healthy weight)'
    case (bmi >= 25 && bmi < 30):
      return 'Overweight (unhealthy weight)'
    case bmi >= 30:
      return 'Obese (very unhealthy weight)'
  }
}

interface parsedArgsBmi {
  height: number,
  weight: number
}

const parseInputBmi = (args: Array<string>): parsedArgsBmi => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  console.log(calculateBmi(parseInputBmi(process.argv)))
} catch (e) {
  console.log('Something went wrong: ', e.message)
}
 