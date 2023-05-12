import React, { useEffect, useState } from 'react'
import List from './components/List'
import axios from "axios"
import { baseURL } from './utils/constant'
import Navbar from './components/Navbar'



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
      <Navbar className="navv"/>
      <main>
        <div className="bodysection">
          <form>
            <h1 className="title">Add Notes</h1>  
            <div className="mb-3">
                <label for="title" className="form-label"><b>Note Title</b></label>
                <input type="text" className="form-control form" value={titleInput} onChange={e=>setTitleInput(e.target.value)} id="exampleInputEmail1" placeholder='Enter the title of your note' />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><b>Description</b></label>
                <textarea class="form-control form" value={input} onChange={e=>setInput(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={updateId ? updateTask : addTask}>{updateId ? "Update Note" : "Add Note"}</button>
          
          </form>
          <div className="listpart">
            <h1>Your Notes</h1>
            <ul>
              {tasks.map((task,title, date) => <List key={task._id} date={task.date} id={task._id} task={task.task} title={task.title} setUpdateUI={setUpdateUI} updateMode={updateMode}/>)}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default App