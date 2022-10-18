import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { ITask } from '../../utils/interface'
import { TaskList } from '../TaskList'

import styles from './Task.module.css'

const LOCAL_STORAGE_KEY = 'ToDo:Tasks'

export function Task() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTask, setNewTask] = useState('')

  function loadTaskFromLocalStorage() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadTaskFromLocalStorage()
  }, [])

  function setTaskToLocalStorage(newTasks: ITask[]) {
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  const tasksQuantity = tasks.length
  const completedTasks = tasks.filter((task) => task.isCompleted).length

  function handleCreateNewTask(taskTitle: string) {
    setTaskToLocalStorage([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      },
    ])
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    handleCreateNewTask(newTask)
    setNewTask('')
  }

  function onChangeTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function handleDeleteTask(taskId: string) {
    const newTaskList = tasks.filter((task) => task.id !== taskId)

    setTaskToLocalStorage(newTaskList)
  }

  function toggleTaskStatus(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task
    })

    setTaskToLocalStorage(newTasks)
  }

  return (
    <>
      <section>
        <form className={styles.taskForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={onChangeTaskTitle}
          />
          <button type="submit">
            Criar
            <PlusCircle size={18} weight="bold" />
          </button>
        </form>
      </section>
      <main className={styles.mainContainer}>
        <header className={styles.headerMainContainer}>
          <div>
            <p>Tarefas criadas</p>
            <span>{tasksQuantity}</span>
          </div>
          <div>
            <p>Concluídas</p>
            <span>
              {completedTasks} de {tasksQuantity}
            </span>
          </div>
        </header>
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleTaskStatus={toggleTaskStatus}
        />
      </main>
    </>
  )
}
