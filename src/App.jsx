import { useState } from 'react'

import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { countAtom, evenSelector } from './store/atoms/count'
import { titleAtom, descAtom, todoAtom, filterAtom, filteredTodosSelector } from './store/atoms/todos'

function App() {
  return (
    <div>
      <RecoilRoot>
        {/* <Count/> */}
        <Todos/>
      </RecoilRoot>
    </div>
  )
}

function Todos(){
  return <div>
    <Todo></Todo>
    <TodoRenderer></TodoRenderer>
  </div>
}

function Todo(){
  const [title, setTitle] = useRecoilState(titleAtom);
  const [desc, setDesc] = useRecoilState(descAtom);
  const setFilter = useSetRecoilState(filterAtom);
  const [todos, setTodos] = useRecoilState(todoAtom);

  const addTodo = ()=>{
    const newTodo = {
      title,
      desc,
    };
    setTodos([...todos, newTodo]);
  }

  return <div>
    <h1>Todo App</h1>
    <input placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} type='text'></input>
    <input placeholder='description' value={desc} onChange={(e)=>setDesc(e.target.value)}></input>
    <button onClick={addTodo}>Add todo</button>
    <br></br>
    <input type='text' placeholder='Enter filter' onChange={(e)=> setFilter(e.target.value)}/>
  </div>
}

function TodoRenderer(){
  const todos = useRecoilValue(todoAtom);
  return <div>
    <h2>All todos</h2>
    {todos.map((todo)=>(
      <div>
         {todo.title} : {todo.desc}
      </div>
    ))}
    <div>
      <FilteredTodoRenderer></FilteredTodoRenderer>
    </div>
  </div> 
}

function FilteredTodoRenderer(){
  const filteredTodos = useRecoilValue(filteredTodosSelector);
  return <div>
    <h2>Filtered todos</h2>
    {filteredTodos.map((todo)=>(
      <div>
      {todo.title} : {todo.desc}
      </div>
    ))}
  </div>
}

function Count(){
  return <div>
    <CountRenderer/>
    <Buttons/>
  </div>
}

function CountRenderer(){
  const count = useRecoilValue(countAtom);
  return <div>
    <b>
      {count}
    </b>
    <EvenCountRenderer/>
  </div>
}

function EvenCountRenderer(){
  const isEven = useRecoilValue(evenSelector);

  return <div>
    {isEven ? "It is even" : null}
  </div> 
}

function Buttons(){
  const setCount = useSetRecoilState(countAtom);
  console.log("rerender");
  
  return <div>
    <button onClick={()=>{setCount(count => count + 1)}}>Increase</button>
    <button onClick={()=>{setCount(count => count - 1)}}>Decrease</button>
  </div>
}

export default App
