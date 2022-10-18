import { Header } from './Components/Header'
import { Task } from './Components/Task'

import './styles/global.css'
import styles from './App.module.css'

export function App() {
  return (
    <>
      <Header />
      <div className={styles.sectionContainer}>
        <Task />
      </div>
    </>
  )
}
