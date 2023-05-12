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
    setTitleInput(title);
    setUpdateId(id);
  }

  const updateTask = ()=>{
    axios.put(`${baseURL}/update/${updateId}`, {title:titleInput,task: input}).then((res)=>{
      console.log(res.data);
      setUpdateUI((prevState) => !prevState)
      setUpdateId(null)
      setInput("")
    })
  }


  return (
    <>
      <Navbar />
      <main>

      
        <h1 className="title">Note Manager</h1>
        <form>
          <div className="mb-3">
              <label for="title" className="form-label">Note Title</label>
              <input type="text" className="form-control" value={titleInput} onChange={e=>setTitleInput(e.target.value)} id="exampleInputEmail1" placeholder='Enter the title of your note' />
          </div>

          <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
              <textarea class="form-control" value={input} onChange={e=>setInput(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary" onClick={updateId ? updateTask : addTask}>{updateId ? "Update Task" : "Add Task"}</button>
        </form>
        <ul>
          {tasks.map((task,title, date) => <List key={task._id} date={task.date} id={task._id} task={task.task} title={task.title} setUpdateUI={setUpdateUI} updateMode={updateMode}/>)}
        </ul>
      </main>
    </>
  )
}

export default App