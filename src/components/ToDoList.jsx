import React, { useState, useCallback } from "react"
import ToDoitem from "./ToDoitem"

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("")
  const [todoList, setTodoList] = useState([
    { id: 1, task: "Task 1", status: "todo" },
    { id: 2, task: "Task 2", status: "todo" },
  ])
  const [doneList, setDoneList] = useState([])

  const onChange = (event) => {
    setInputValue(event.target.value)
  }

  const addTask = (event) => {
    event.preventDefault()

    if (inputValue.trim() === "") return

    const newTask = {
      id: todoList.length + 1,
      task: inputValue,
      status: "todo",
    }

    setTodoList((prevTodoList) => [...prevTodoList, newTask])
    setInputValue("")
  }

  const removeTask = useCallback((id, status) => {
    if (status === "todo") {
      setTodoList((prevTodoList) => prevTodoList.filter((task) => task.id !== id))
    } else {
      setDoneList((prevDoneList) => prevDoneList.filter((task) => task.id !== id))
    }
  }, [])

  const toggleStatus = useCallback((id) => {
    setTodoList((prevTodoList) => {
      const taskToUpdate = prevTodoList.find((task) => task.id === id)
      const updatedTodoList = prevTodoList.filter((task) => task.id !== id)
      setDoneList((prevDoneList) => [...prevDoneList, { ...taskToUpdate, status: "done" }])
      return updatedTodoList
    })
  }, [])

  const moveBackToTodo = useCallback((id) => {
    setDoneList((prevDoneList) => prevDoneList.filter((task) => task.id !== id))
    setTodoList((prevTodoList) => {
      const taskToUpdate = doneList.find((task) => task.id === id)
      return taskToUpdate ? [...prevTodoList, { ...taskToUpdate, status: "todo" }] : prevTodoList
    })
  }, [doneList])

  return (
    <div className="to-do-list">
      <h3>To Do List</h3>
      <form onSubmit={addTask} className="form">
        <input type="text" onChange={onChange} value={inputValue} />
        <button type="submit">Add Task</button>
      </form>
      <div className="column">
        <h4>To Do</h4>
        {todoList.map((task) => (
          <ToDoitem key={task.id} task={task} removeTask={removeTask} toggleStatus={toggleStatus} moveBackToTodo={moveBackToTodo} />
        ))}
      </div>
      <div className="column">
        <h4>Done</h4>
        {doneList.map((task) => (
          <ToDoitem key={task.id} task={task} removeTask={removeTask} toggleStatus={toggleStatus} moveBackToTodo={moveBackToTodo} />
        ))}
      </div>
    </div>
  )
}

export default ToDoList
