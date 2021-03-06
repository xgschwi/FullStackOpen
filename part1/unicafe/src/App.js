import React, { useState } from 'react'

// Displays single statistic
const Statistic = (props) => {
  return(
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

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
     <table>
       <tbody>
       <Statistic text="Good" value={good}/>
       <Statistic text="Neutral" value={neutral}/>
       <Statistic text="Bad" value={bad}/>
       <Statistic text="All" value={total}/>
       <Statistic text="Average" value={avg}/>
       <Statistic text="Positive" value={good/total*100 + '%'}/>
       </tbody>
     </table>
    )
  }
}

const Button = ({handleClick, text}) => {
  return(
      <button onClick={handleClick}>{text}</button>
  )
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
      <h3>Give Feedback</h3>
      
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>

      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App