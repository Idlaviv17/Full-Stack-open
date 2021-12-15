import React from 'react'

const Header = ({ course }) => {
    return <h1>{course.name}</h1>
  }
  
  const Total = ({ course }) => {
    const exercises = []
    
    for (let i in course.parts) {
      exercises.push(course.parts[i].exercises)
    }
  
    const total = exercises.reduce((sum, elem) => sum + elem)
  
    return <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((x, i) => {
          return <Part part={x} key={i + 1} />
        })}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

export default Course