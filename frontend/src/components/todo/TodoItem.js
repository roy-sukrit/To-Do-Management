import { useState } from 'react'
import { useTodoDispatch } from '../../contexts/TodoConext'
import { FaCheck, FaTrash, FaRegEdit } from "react-icons/fa";
import { deleteTodo } from '../../api/services/todo.service';
import { updateTodo as updateTodoAPI } from '../../api/services/todo.service';  // Make sure you import the correct update API

const TodoItem = ({ id, text, done ,setTodoList,setTaskBoolean}) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text)
  const [clear, setClear] = useState(false);

  const dispatch = useTodoDispatch();

  const onClear = () => {
    dispatch({ type: 'CLEAR', id });
    setClear(prev => !prev);
    updateTodo(id, { done: true });  // Set done to true when clearing the todo
  };

  const onRemove = () => {
    dispatch({ type: 'REMOVE', id });
    deleteTodoById(id);  // Fixed the typo here
  };

  const onToggle = () => setEditing((prev) => !(prev));

  const deleteTodoById = async (id) => {
    console.log("Delete Todo ->", id);
    const deleteAPI = await deleteTodo(id);
    console.log("Delete Success", deleteAPI);
    setTodoList((prevList) => prevList.filter(todo => todo._id !== id));  // Update list after delete
    setTaskBoolean(true)
  };

  const updateTodo = async (id, payload) => {
    console.log("Update Todo ->", id);
    const updateAPI = await updateTodoAPI(id, payload);  // Call to actual update API
    console.log("Update Success", updateAPI);
    setTodoList((prevList) => 
      prevList.map(todo => todo.id === id ? { ...todo, ...payload } : todo)  // Update todo in the list
    );
    setTaskBoolean(true)
  };

  const onUpdate = (e, id, newText) => {
    e.preventDefault();
    if (text === newText) {
      setEditing((prev) => !prev);
    }
    dispatch({ type: 'UPDATE', id, newText });
    setEditing((prev) => !prev);
    updateTodo(id, { text: newText });  // Pass new text to update API
  };

  return (
    <li
      id="todo-items"
      className='flex flex-row flex-nowrap w-full items-center 
    justify-between rounded-lg py-6 my-2 bg-white'>
      <div className='flex flex-row w-4/5'>
        <button
          className={done
            ? 'bg-black text-white rounded-md mx-3 w-7 h-7 relative grid justify-center items-center'
            : 'bg-gray-300 text-white rounded-md mx-3 w-7 h-7 relative grid justify-center items-center hover:bg-gray-400'}
          onClick={onClear}>
          <FaCheck />
        </button>
        {editing ? (
          <form
            className='w-full'
            onSubmit={(e) => onUpdate(e, id, newText)}>
            <input
              className='w-full focus:outline-none'
              type='text'
              value={newText}
              onChange={e => setNewText(e.target.value)}
            />
          </form>
        ) : (
          <p className={`${clear ? 'line-through' : ''}`}>{newText}</p>
        )}
      </div>
      <div className='flex flex-row flex-nowrap'>
        <button
          className='rounded-md w-8 h-8 relative grid justify-center 
          mx-1 items-center hover:bg-gray-300'
          onClick={onToggle}>
          <FaRegEdit className='text-gray-500' />
        </button>
        <button
          className='rounded-md w-8 h-8 relative grid justify-center 
          items-center mr-3 hover:bg-gray-300'
          onClick={onRemove}>
          <FaTrash className='text-gray-500' />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
