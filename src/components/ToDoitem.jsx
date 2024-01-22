import React from 'react'

const ToDoItem = ({ task, updateStatus, removeTask }) => {
  console.log(`${task.id}`)

  return (
    <div className="list-item">
      <p>{task.task}</p>

      <div className="plan-box">
        {task.status === "todo" && (
          <>
            <button onClick={() => removeTask(task.id)}>Delete</button>
            <button onClick={() => updateStatus(task.id, "done")}>I Did it</button>
          </>
        )}
        {task.status === "done" && (
          <>
            <button onClick={() => removeTask(task.id)}>Delete</button>
            <button onClick={() => updateStatus(task.id, "todo")}>Start Over</button>
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(ToDoItem)
