import React from 'react'

const App = () => {
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
    ],

    print: function () {
      console.log(this.name)
    }
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  props.course.print()
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.course.parts[0].name} amount={props.course.parts[0].exercises} />
      <Part name={props.course.parts[1].name} amount={props.course.parts[1].exercises} />
      <Part name={props.course.parts[2].name} amount={props.course.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.amount}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {
          props.course.parts[0].exercises +
          props.course.parts[1].exercises +
          props.course.parts[2].exercises
        }
      </p>
    </>
  )
}

export default App