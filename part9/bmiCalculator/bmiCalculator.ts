const calculateBmi = (height: number, weight: number): string => {
   if (isNaN(height) || isNaN(weight))
      throw new Error('Values are not numbers!')
   else {
      if (height === 0 || weight === 0) throw new Error('Height and Weight cannot be 0')
      const meterHeight = height / 100
      const bmi = weight / (meterHeight * meterHeight)

      if (bmi < 18.5) return 'Underweight (Unhealthy Weight)'
      else if (bmi < 23) return 'Normal range (Healthy Weight)'
      else if (bmi < 25) return 'Overweight I (At Risk Weight)'
      else if (bmi < 30) return 'Overweight II (Moderately Obese Weight)'
      else return 'Overweight III (Severely obese)'
   }
}

console.log(calculateBmi(180, 74))