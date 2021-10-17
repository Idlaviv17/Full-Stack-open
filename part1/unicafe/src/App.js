import React, { useState } from "react"

const Button = (props) => {
  console.log(props)
  const { handleClick, text } = props

  return <button onClick={handleClick}> {text} </button>
}

const StatisticLine = (props) => {
  console.log(props)
  const { text, value, extra } = props

  if (extra === undefined) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>{extra}</td>
      </tr>
    )
  }
}

const Statistics = (props) => {
  console.log(props)
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  const average = (good + bad * -1) / (good + neutral + bad)
  const positive = (good / (good + neutral + bad)) * 100

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} extra="%" />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App