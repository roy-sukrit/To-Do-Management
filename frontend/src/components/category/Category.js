import React, { useState } from 'react'
import CategoryCreate from './CategoryCreate'
import CategoryList from './CategoryList'
import { useEffect } from 'react'
import slugify from 'react-slugify';

import { createCategory, fetchCategories } from '../../api/services/todo.service'
export default function Category({userEmail,isAuthenticated,userName}) {

    const [category,setCategories] = useState([]);
    useEffect(() => {


        console.log("Category Component",userEmail,isAuthenticated,userName);
      
        categoryHandler(userEmail);
        

    }, [userEmail])

    const categoryHandler = async (email) => {
        try {
            const categoryData = await fetchCategories(email);
            console.log('All Categories', categoryData);

            if (categoryData.length === 0) {
                console.log('No data for this user, creating default category.');

                const newCategory = await createCategory({
                    name: 'Home',
                    slug: slugify('Home'),
                    email,
                });

                console.log('New Category', newCategory);
                setCategories([newCategory]); // Add the new category
            } else {
                setCategories(categoryData); // Set fetched categories
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
            <CategoryCreate category={category} setCategories={setCategories} userEmail={userEmail}/>
                <CategoryList category={category} />

            </div>
        </aside>
    )
}
