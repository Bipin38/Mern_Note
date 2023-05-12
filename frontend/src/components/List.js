import axios from 'axios'
import React,{ useEffect, useState }  from 'react'
import {BiEditAlt} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import { baseURL } from '../utils/constant'

const List = ({id, task,title,date,setUpdateUI,updateMode}) => {
  const [input, setInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  // const [tasks, setTask] = useState([]);
  // const [updateUI, setUpdateUI] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  

const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
        console.log(res);
        setUpdateUI(prevState => !prevState)
    });
}


  return (
    <li>
    <div className="titles">
        Title: {title} <br/>
        Description: {task}  <br/> 
        Date: {date.substring(0,10)}
    </div>
        
        
        <div className='icon_holder'>
            <BiEditAlt className='icon' onClick={()=>updateMode(id,task,title)}/>
            <BsTrash className='icon' onClick={removeTask} />
        </div>
    </li>
  )
}

export default List