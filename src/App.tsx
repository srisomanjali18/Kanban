import React, { useEffect, useState } from 'react';
import './App.css'
import TaskCard from './compnents/TaskCard'
import { Status, statuses, Task } from './utils/data-tasks'


const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      title: status,
      tasks: tasksInColumn,
    }
  })

  useEffect(() => {
    fetch('http://localhost:3000/tasks').then((res) => res.json()).then((data) => {
      setTasks(data)
    })
  }, [])

  const updateTaskTitle = (task: Task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t;
    })
    setTasks(updatedTasks);
  }

  const updateTaskStatus = (task: Task, status: Status) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...task, status })
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status }
      }
      return task;
    });
    setTasks(updatedTasks);
    updateTaskStatus(updatedTasks.find((task) => task.id === id) as Task, status);
  }
  return (
    <div className="flex divide-x">
      {columns.map((column) => (
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.title as Status)}
          className="flex-1 p-2"
        >
          <div className="flex justify-between text-3xl p-2 font-bold">
            <h2 className="capitalize">{column.title}</h2>
          </div>

          {column.tasks.map((task) => (
            <TaskCard
              task={task}
              updateTaskTitle={updateTaskTitle} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App;