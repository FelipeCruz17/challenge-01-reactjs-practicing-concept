import { Check, Trash, Clipboard } from 'phosphor-react'
import { ITask } from '../../utils/interface'
import styles from './TaskList.module.css'

interface TaskListProps {
  tasks: ITask[]
  onDeleteTask: (taskId: string) => void
  onToggleTaskStatus: (taskId: string) => void
}

export function TaskList({
  tasks,
  onDeleteTask,
  onToggleTaskStatus,
}: TaskListProps) {
  return (
    <>
      <div className={styles.taskContainer}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskContent}>
            <button
              className={styles.checkButton}
              onClick={() => onToggleTaskStatus(task.id)}
            >
              {task.isCompleted === false ? (
                <div className={styles.checkedDiv} />
              ) : (
                <div className={styles.uncheckedDiv}>
                  <Check size={14} color="white" weight="bold" />
                </div>
              )}
            </button>

            <p
              className={task.isCompleted === true ? styles.textCompleted : ''}
            >
              {task.title}
            </p>
            <button
              className={styles.deleteButton}
              onClick={() => onDeleteTask(task.id)}
            >
              <Trash size={18} />
            </button>
          </div>
        ))}
        {tasks.length <= 0 && (
          <section className={styles.emptyTaskList}>
            <Clipboard size={48} />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
