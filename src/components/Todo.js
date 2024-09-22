import React from 'react'
import "./Todo.css";
import { useState,useRef ,useEffect} from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


function Todo() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditID] = useState(0);


  const ref = useRef(null)


  useEffect(() => {
    ref.current.focus();
  })
  
  const addTodo = () => {
    if (todo !== '') {
      if (editId) {
        setTodos(todos => todos.map(to =>
          to.id === editId
            ? { id: to.id, list: todo, status: to.status } 
            : to
        ));
        setEditID(0);
      } else {
        setTodos(todos => [...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo('');
    }
  };
  

  const onDelete=(id)=>{
     setTodos(todos.filter((item) => {
      return item.id !== id;
     }))
  }

  const onComplete = (id) => {

    let complete = todos.map((list) => {
      if (list.id === id) {
      return ({...list,status:!list.status})
      }
      return list;
    })
    setTodos(complete)
  }
  
  const onEdit = (id) => {
    const editTodo = todos.find((to) => { return to.id === id })
    
    setTodo(editTodo.list)
    setEditID(editTodo.id)

   }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='container'>
      <h2>
        TODO APP
      </h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <input type='text' ref={ref} value={todo} placeholder='Enter your todo' className='form-control' onChange={(event)=>{ setTodo(event.target.value)}} />
        <button onClick={addTodo}>{editId?'EDIT':'ADD'}</button>
      </form>
      <div className='list'>
        <ul>

          {todos.map((todo) => (
            <li className='list-items'>
              <div className='list-item-list' id= {todo.status? 'list-item':''}>{todo.list}</div>
              <span>
                <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(todo.id)}/>
                <FiEdit className='list-item-icons' id='edit' title='Edit' onClick={()=>onEdit(todo.id)}/>
                <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={()=>onDelete(todo.id)}/>
              </span>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo
