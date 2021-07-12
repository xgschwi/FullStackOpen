interface Result {
   periodLength: number,
   trainingDays: number,
   success: boolean,
   rating: number,
   ratingDescription: string,
   target: number,
   average: number
}

const calculateExercises = (): Result => {

   let days: Array<number> = [];
   let target: number;
   let periodLength: number;

   try {
      target = Number(process.argv[2]);
      periodLength = process.argv.length - 3;

      process.argv.forEach((value, index) => {
          if (index > 2) days.push(Number(value));
      })

   } catch(e) {
       throw new Error(e.message);
   }

   const trainingDays = days.filter(day => day != 0);

   let sum: number;

   trainingDays.forEach(day => {
       if (isNaN(sum)) sum = 0;
       sum = sum + day;
   })

   const average = sum / days.length;

   let rating: number;
   let ratingDescription: string;

   if ( average < target / 2) { rating = 1; ratingDescription = 'Could use some improvement'; }
   else if (average < target) { rating = 2; ratingDescription = 'Not too bad, but could be better'; }
   else { rating = 3; ratingDescription = 'Great job! You reached your goal'; }

   return {
      periodLength,
      trainingDays: trainingDays.length,
      target,
      average,
      success: average > target ? true : false,
      rating,
      ratingDescription
   }
} 

console.log(calculateExercises());