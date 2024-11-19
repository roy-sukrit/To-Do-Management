import { useEffect, useState } from 'react';
import { usePathState } from '../../contexts/PathContext';
import { useTodoState } from '../../contexts/TodoConext'
import TodoItem from './TodoItem';
import { loadTodosByCategory } from '../../api/services/todo.service';

const TodoList = ({userEmail,currentCategory,todoList,setTodoList}) => {
  const todos = useTodoState();
  const { path } = usePathState();

  const [taskBoolean , setTaskBoolean] = useState(false);
  // const [todoList,setTodoList] = useState([])

  useEffect(()=>{
    console.log("todolist",currentCategory,userEmail);
    if(currentCategory){loadTodosByCategoryHandler()};
  },[currentCategory,taskBoolean])

  //Load Todos based on category

  const loadTodosByCategoryHandler =async () =>{

    console.log("TodoList -> UseEffect",userEmail);
    console.log("TodoList -> USeEffect",currentCategory);

    const todosByCategory= await loadTodosByCategory(currentCategory);
    console.log('Todos by Category Data :', todosByCategory);

    
    setTodoList(todosByCategory)


  }

  const filterTodos = todos.filter((item) => item.category[0].slug === path);

  const todosList = todoList.map(item => {
    return <TodoItem
    taskBoolean={taskBoolean}
    setTaskBoolean={setTaskBoolean}
    setTodoList={setTodoList}
      key={item._id}
      id={item._id}
      text={item.text}
      done={item.done}
      category={item.category}
    />
  })

  return (
    <ul className='flex flex-col w-full h-full'>
      {todosList}
    </ul>
  )
}

export default TodoList;
