import React from 'react'


const ToDoitem = ({task, removeTask, toggleStatus, moveBackToTodo}) =>   {  
  console.log( `${task.id}`)
  
        return (
      <div className="list-item">
        <p>{task.todo}</p>

        <div className='plan-box'> 
          {task.status === "todo" && (
            <>
              <button onClick={() => removeTask(task.id, "todo")}>Delete</button>
              <button onClick={() => toggleStatus(task.id)}>I Did it</button>
            </>
          )}
          {task.status === "done" && (
            <>
              <button onClick={() => removeTask(task.id, "done")}>Delete</button>
              <button onClick={() => moveBackToTodo(task.id)}>Start Over</button>
            </>
          )}
        </div>
      </div>
    )
  }


export default React.memo (ToDoitem)

