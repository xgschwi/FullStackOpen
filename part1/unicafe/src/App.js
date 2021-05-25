import React, { useState } from 'react'

// Displays Statistics of button clicks
// Uses Destructuring to extract good, neutral, and bad from props
const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let avg = (good - bad) / total
  if (total === 0){
    return(
      <div>
        <p>No Feedback Given</p>
      </div>
    )
  }
  else {
    return(
     <div>
       <p>Good {good}</p>
       <p>Neutral {neutral}</p>
       <p>Bad {bad}</p>
       <p>All {total}</p>
       <p>Average {avg}</p>
       <p>Positive {good/total*100} %</p>
     </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h3><strong>Give Feedback</strong></h3>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h3><strong>Statistics</strong></h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App