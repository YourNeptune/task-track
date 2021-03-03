import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState} from 'react'

function App() {
  const [showAddForm, setShowAddFrom] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Learning French',
        day: 'Feb 1st at 10:00am',
        reminder: true
    },
    {
        id: 2,
        text: 'Go Shopping',
        day: 'Feb 2st at 9:00am',
        reminder: false
    },
    {
        id: 3,
        text: 'Washing clothes',
        day: 'Feb 4st at 2:00pm',
        reminder: true
    }
  ])

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id ))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  // Add Task
  const addTask = (task) => {
    console.log(task)
    const id = Math.floor(Math.random() * 10000 + 1)
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header 
        showAddForm={showAddForm}
        onClick={() => {
          setShowAddFrom(!showAddForm)
        }}
      />
      {showAddForm && <AddTask onAdd={addTask}/>}
      {
        tasks.length > 0 ?
        <Tasks 
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        /> : 'No Tasks'
      }
    </div>
   
  );
}

export default App;
