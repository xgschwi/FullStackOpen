import React from 'react'

// Displays Header for course
const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

// Displays a Part of Content
const Part = (props) => {
  return(
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

// Displays content
const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part part={props.parts[0].name} exercise = {props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise = {props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise = {props.parts[2].exercises}/>          
    </div>
  )
}

// Displays total exercises
const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
       name: 'Using props to pass data',
       exercises: 7
      },
      {
        name: 'State of a component',
       exercises: 14
     }
   ]
  }

  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;
