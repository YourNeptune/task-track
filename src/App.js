import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {useState, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
  const [showAddForm, setShowAddFrom] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const tasks = await res.json()
      setTasks(tasks)
    }
    getTasks()
  },[])

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const task = await res.json()
    return task
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !== id ))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const task = await fetchTask(id)
    const updatedTask = {...task, reminder: !task.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newTask = await res.json()
    setTasks([...tasks, newTask])

    // const id = Math.floor(Math.random() * 10000 + 1)
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  return (
    <BrowserRouter>
      <div className="container">
      <Header 
        showAddForm={showAddForm}
        onClick={() => {
          setShowAddFrom(!showAddForm)
        }}
      />
      
      <Route path='/' exact render={(props) => (
        <>
          {showAddForm && <AddTask onAdd={addTask}/>}
          {
            tasks.length > 0 ?
            <Tasks 
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            /> : 'No Tasks'
          }
        </>
      )}/>
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </BrowserRouter>
   
  );
}

export default App;
