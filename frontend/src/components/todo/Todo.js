import { useState } from 'react';
import TodoCreate from './TodoCreate'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'

export default function Todo({userEmail,currentCategory}) {

    const [todoList, setTodoList] = useState([]);

  // Function to handle adding a new todo
  const handleAddTodo = (newTodo) => {
    setTodoList((prevList) => [...prevList, newTodo]);
    
  }
    return (
        <div className='flex flex-col w-screen h-screen items-center '>
            <div className="flex flex-col w-4/5 h-full gap-2.5 p-12 pb-0">
                <TodoHeader />
                <TodoCreate currentCategory={currentCategory} onAddTodo={handleAddTodo}  userEmail={userEmail} />
                <TodoList currentCategory={currentCategory} setTodoList={setTodoList} todoList={todoList} userEmail={userEmail}/>
            </div>
        </div>
    )
}

