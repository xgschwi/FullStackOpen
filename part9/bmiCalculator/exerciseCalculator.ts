interface Result {
   periodLength: number,
   trainingDays: number,
   success: boolean,
   rating: number,
   ratingDescription: string,
   target: number,
   average: number
}

const calculateExercises = (days: Array<number>, target: number): Result => {
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
      periodLength: days.length,
      trainingDays: trainingDays.length,
      target,
      average,
      success: average > target ? true : false,
      rating,
      ratingDescription
   }
} 

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));