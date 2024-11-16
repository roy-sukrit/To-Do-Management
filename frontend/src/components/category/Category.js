import React, { useState } from 'react'
import CategoryCreate from './CategoryCreate'
import CategoryList from './CategoryList'
import { useEffect } from 'react'
import slugify from 'react-slugify';

import { createCategory, fetchCategories } from '../../api/services/todo.service'
export default function Category({ userEmail, isAuthenticated, userName, setCurrentCategory, currentCategory }) {
    console.log("Category -> setCurrentCategory:", setCurrentCategory);

    const [category, setCategories] = useState([]);
    
    //Use Effect Calls
    useEffect(() => {
        console.log("Category -> Use Effect1", userEmail, isAuthenticated, userName);
        categoryHandler(userEmail);
    }, [userEmail])


    useEffect(() => {
        console.log(" Category -> Use Effect2", currentCategory);
    }, [currentCategory]);


    //Categgory Select Handler
    const handleCategorySelect = (category) => {
        console.log(
            "handleCategorySelect", category
        );
        setCurrentCategory(category);
    };


    const categoryHandler = async (email) => {
        try {
            const categoryDataAPI = await fetchCategories(email);
            console.log('categoryDataAPI', categoryDataAPI);

            if (categoryDataAPI.length === 0) {
                console.log('No data for this user, creating default category.');

                const newCategory = await createCategory({
                    name: 'Home',
                    slug: slugify('Home'),
                    email,
                });

                console.log('New Category', newCategory);
                setCategories([newCategory]); // Add the new category
            } else {
                setCategories(categoryDataAPI); // Set fetched categories
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    return (
        <aside
            id='category-aside'
            className='flex  flex-col h-screen pl-5 pt-12 w-2/5 pb-12'>
            <div
                className='bg-white h-screen p-9 rounded-lg'>
                <CategoryCreate category={category} setCategories={setCategories} userEmail={userEmail} />
                <CategoryList handleCategorySelect={handleCategorySelect}  setCategories={setCategories} currentCategory={currentCategory} category={category} setCurrentCategory={setCurrentCategory}/>

            </div>
        </aside>
    )
}
