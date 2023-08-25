import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const randSelected = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }
  const givePoint = () => {
    const arr = points
    arr[selected] += 1

    //refresh the iondex of most voted one when a point is given
    setMostVoted(points.indexOf(Math.max(...points)))
    setPoints(arr)
  }


  return (
    <div>
      <div>
        <h3>Anecdote of the day</h3>
        <div>{anecdotes[selected]}</div>
        <div><button onClick={randSelected}>next anecdote</button></div>
        <div><button onClick={givePoint}>give point</button></div>
      </div>
      <div>
        <h3>Anecdote with most votes</h3>
        <div>{anecdotes[mostVoted]}</div>
      </div>
    </div>
  )
}


export default App