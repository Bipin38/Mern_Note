import React, { useEffect, useState } from 'react'
import List from './components/List'
import axios from "axios"
import { baseURL } from './utils/constant'
import Navbar from './components/Navbar'
import Notemanager from './components/Notemanager'


const App = () => {

  const [input, setInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [tasks, setTask] = useState([]);
  const [updateUI, setUpdateUI] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  useEffect(()=>{
    axios.get(`${baseURL}/get`)
    .then((res)=>{

      console.log(res.data);
      setTask(res.data);
    })
  },[updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, {title:titleInput ,task:input})
    .then((res)=>{
      console.log(res.data)
      setInput("");
      setTitleInput("");
      setUpdateUI((prevState) => !prevState)
    })
  }

  const addTitle =() =>{
    axios.post(`${baseURL}/save`, {title:titleInput})
    .then((res)=>{
      console.log(res.data)
      // setTitleInput("");
      setUpdateUI((prevState) => !prevState)
    })
  }

  const updateMode = (id, text, title) => {
    // console.log(text);
    setInput(text);
    // setTitleInput(title);
    setUpdateId(id);
  }

  const updateTask = ()=>{
    axios.put(`${baseURL}/update/${updateId}`, {task: input}).then((res)=>{
      console.log(res.data);
      setUpdateUI((prevState) => !prevState)
      setUpdateId(null)
      setInput("")
    })
  }

  const updateTitle = () =>{
    axios.put(`${baseURL}/update/${updateId}`, {title:titleInput}).then((res)=>{
      // console.log(res.data);
      setUpdateUI((prevState) => !prevState)
      setUpdateId(null)
      setTitleInput("")
    })
  }

  return (
    <>
      <Navbar />
      <main>

      
        <h1 className="title">Note Manager</h1>
        <Notemanager/>
        <ul>
          {tasks.map((task,title, date) => <List key={task._id} date={task.date} id={task._id} task={task.task} title={task.title} setUpdateUI={setUpdateUI} updateMode={updateMode}/>)}
        </ul>
      </main>
    </>
  )
}

export default App