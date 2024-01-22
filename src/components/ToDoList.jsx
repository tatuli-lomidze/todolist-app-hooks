import React, { useState, useCallback } from "react"
import ToDoitem from "./ToDoitem"

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("")
  const [taskList, setTaskList] = useState([
    { id: 1, task: "Exercise", status: "todo" },
    { id: 2, task: "Study", status: "todo" }
  ])

  const onChange = (event) => {
    setInputValue(event.target.value)
  }

  const addTask = (event) => {
    event.preventDefault()


    const newTask = {
      id: taskList.length + 1,
      task: inputValue,
      status: "todo"
    }

    setTaskList((prevTaskList) => [...prevTaskList, newTask])
    setInputValue("")
  }

  const updateStatus = useCallback((id, newStatus) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    )
  }, [])

  const removeTask = useCallback((id) => {
    setTaskList((prevTaskList) => prevTaskList.filter((task) => task.id !== id))
  }, [])

  return (
    <div className="to-do-list">
      <h3>To Do List</h3>
      <form onSubmit={addTask} className="form">
        <input type="text" onChange={onChange} value={inputValue} />
        <button type="submit">Add Task</button>
      </form>
      <div className="column">
        <h4>To Do</h4>
        {taskList
          .filter((task) => task.status === "todo")
          .map((task) => (
            <ToDoitem key={task.id} task={task} updateStatus={updateStatus} removeTask={removeTask} />
          ))}
      </div>
      <div className="column">
        <h4>Done</h4>
        {taskList
          .filter((task) => task.status === "done")
          .map((task) => (
            <ToDoitem key={task.id} task={task} updateStatus={updateStatus} removeTask={removeTask} />
          ))}
      </div>
    </div>
  )
}

export default ToDoList
