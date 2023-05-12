import React from 'react'
import  { useEffect, useState } from 'react'
import {baseURL} from '../utils/constant'
import axios from "axios"



const Notemanager = () => {

  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
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
    axios.post(`${baseURL}/save`, {title:title ,task:input})
    .then((res)=>{
      console.log(res.data(title,tasks))
      setInput("");
      setTitle("");
      setUpdateUI((prevState) => !prevState)
    })
  }

  return (
    <form>
        <div className="mb-3">
            <label for="title" className="form-label">Note Title</label>
            <input type="text" className="form-control" value={title} onChange={e=>setTitle(e.target.value)} id="exampleInputEmail1" placeholder='Enter the title of your note' />
        </div>

        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control" value={input} onChange={e=>setInput(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onClick={addTask}>{updateId ? "Update Task" : "Add Task"}</button>
    </form>
  )
}

export default Notemanager