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
    <></>
  )
}

export default Notemanager