import React, { useEffect, useState } from 'react'
import { useCategoryDispatch, useCategoryState } from '../../contexts/CategoryContext';
import { FaPlus } from "react-icons/fa";
import { usePathState } from '../../contexts/PathContext';
import { v4 as uuidv4 } from 'uuid';
import { createCategory, fetchTodos } from '../../api/services/todo.service';
import slugify from 'react-slugify';

export default function CategoryCreate({category,setCategories,userEmail}) {
   
    const [categoryName, setCategoryName] = useState("");
    const categoryState = useCategoryState();
    const dispatch = useCategoryDispatch();
    const { changePath } = usePathState();

    useEffect(async()=>{
        console.log("fetchTodos",await fetchTodos())
    },[])

    const handleCreateCategory = async(e) => {
        e.preventDefault();
        if (!categoryName) return;
        if (categoryState.map(item => item.name).includes(categoryName)) return;

        dispatch({
            type: "CREATE",
            category: {
                id: uuidv4(),
                name: categoryName,
                slug: `${categoryName}`
            }
        })
        

        //Added Db Call 
         const newCategory = await createCategory({
                    name: categoryName,
                    slug: slugify(categoryName),
                    email:userEmail,
                });

        setCategories([...category,newCategory])
        setCategoryName("")
        changePath(`${categoryName}`);
    }

    return (
        <div
            id="category-text-input"
            className='rounded-lg w-full mt-3'>
            <form
                className='flex flex-row w-full items-center gap-2'
                onSubmit={handleCreateCategory}>
                <span><FaPlus className='text-gray-300' /></span>
                <input
                    maxLength={10}
                    placeholder='Create new category...'
                    className='w-full p-3 rounded-lg focus:outline-none'
                    type="text"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName} />
            </form>
        </div>
    )
}
