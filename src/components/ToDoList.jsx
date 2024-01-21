import { useState } from "react"
import ToDoitem from "./ToDoitem"

const ToDolist = () => {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([
    { id: 1, todo: "Exercise", status: "todo" },
    { id: 2, todo: "Study", status: "todo" }
  ]);
  const [doneList, setDoneList] = useState([]);

  const onChange = (event) => {
    const value = event.target.value;
    setInputValue(value)
  };

  const addTask = (event) => {
    event.preventDefault()

    const newTask = {
      id: todoList.length + 1,
      todo: inputValue,
      status: "todo",
    };

    setTodoList([...todoList, newTask])
    setInputValue('')
  };

  const removeTask = (id, status) => {
    const updatedList =
      status === "todo"
        ? todoList.filter((task) => task.id !== id)
        : doneList.filter((task) => task.id !== id);

    setTodoList(updatedList);
    setDoneList(status === "done" ? updatedList : doneList)
  }

  const toggleStatus = (id) => {
    const taskToUpdate = todoList.find((task) => task.id === id)

    if (taskToUpdate) {
      const updatedTodoList = todoList.filter((task) => task.id !== id)
      const updatedDoneList = [...doneList, { ...taskToUpdate, status: "done" }]

      setTodoList(updatedTodoList)
      setDoneList(updatedDoneList)
    }
  };

  const moveBackToTodo = (id) => {
    const taskToUpdate = doneList.find((task) => task.id === id)

    if (taskToUpdate) {
      const updatedDoneList = doneList.filter((task) => task.id !== id)
      const updatedTodoList = [...todoList, { ...taskToUpdate, status: "todo" }]

      setTodoList(updatedTodoList)
      setDoneList(updatedDoneList)
    }
  };

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
        <h4>Done </h4>
        {doneList.map((task) => (
          <ToDoitem key={task.id} task={task} removeTask={removeTask} toggleStatus={toggleStatus} moveBackToTodo={moveBackToTodo} />
        ))}
      </div>
    </div>
  );
};

export default ToDolist
