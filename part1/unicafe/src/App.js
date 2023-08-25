import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <div> 
        <h3> Give feedback </h3>
        <button onClick={addGood}>good</button>
        <button onClick={addNeutral}>neutral</button>
        <button onClick={addBad}>bad</button>
      </div>
      <h3>statistics</h3>
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
      
    </div>
  )
}

const Statistics = (props) => {
  if (props.good + props.bad + props.neutral > 0){
    return (
      <div>
        <table>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value = {props.good + props.bad + props.neutral} />
        <StatisticLine text="average" value ={ (1*props.good + (-1)*props.bad )/(props.good + props.bad + props.neutral) + " %" }  />
        <StatisticLine text="positive" value ={props.good/(props.good + props.bad + props.neutral)*100 } />
        </table>
      </div>
  )
  }
  else {
    return(
    <div>
        <h3>statistics</h3>
        <div>No feedback given</div>
    </div>
    )
  }

}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}


export default App
