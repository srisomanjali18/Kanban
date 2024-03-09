import { Task } from '../utils/data-tasks'
import { useState } from 'react'


const TaskCard = (props: {
  task: Task
  updateTaskTitle: (task: Task) => void
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const task = props.task;
  const updateTaskTitle = props.updateTaskTitle;
  return <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("id", task.id)
    }}
    className="border rounded-lg px-2 m-2 bg-gray-50 w-56"
  >
    <div className="text-base font-base py-2">
      {isEditingTitle ? (
        <input
          autoFocus
          className="w-full"
          onBlur={() => setIsEditingTitle(false)}
          value={task.title}
          onChange={(e) => updateTaskTitle({ ...task, title: e.target.value })}
        />
      ) : (
        <div onClick={() => setIsEditingTitle(true)}>
          {task.title}
        </div>
      )}
    </div>
  </div>
}

export default TaskCard

