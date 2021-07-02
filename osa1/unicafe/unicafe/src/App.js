import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button callback={() => setGood(good + 1)} text="good" />
      <Button callback={() => setNeutral(neutral + 1)} text="neutral" />
      <Button callback={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ callback, text }) => {
  return (
    <>
      <button onClick={callback}>{text}</button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / sum()
  }

  const percentage_positive = () => {
    return (good / sum()) * 100 + ' %'
  }

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />

            <StatisticsLine text="all" value={sum()} />
            <StatisticsLine text="average" value={average()} />
            <StatisticsLine text="positive" value={percentage_positive()} />
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }

}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>
          {text} {value}
        </td>
      </tr>
    </>
  )
}

export default App;
