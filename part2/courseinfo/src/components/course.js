const Course = ({course}) => {
    const total = course.parts.reduce((sum, current) => {
      return (sum + current.exercises)
    }, 0
    )
    return(
      <div>
        <div>
          <h3>{course.name}</h3>
        </div>
        <div>
          {course.parts.map(part => <Part key={part.id}  part={part} />)
  
          }
        </div>
        <div>
          <Total total = {total} />
        </div>
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <li>{props.part.name} {props.part.exercises}</li>
      </div>
    )
  }
  
  const Total = (props) => {
    return(
      <div>
        <b>total of {props.total} exercises</b> 
      </div>
    )
  }
  export default Course