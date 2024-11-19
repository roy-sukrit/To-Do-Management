import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserState } from '../../contexts/UserContext';
import Category from '../category/Category';
import Todo from '../todo/Todo';
import Welcome from './Welcome';
import slugify from 'react-slugify';

import { createCategory, fetchCategories } from '../../api/services/todo.service';

const Home = () => {
    const navigate = useNavigate(); // Navigation hook
    const location = useLocation(); // Get the location object

    const [currentCategory, setCurrentCategory] = useState('');


    // Make sure the location.state exists before attempting to access profile
    const { profile } = location.state || {};
    const { userEmail = '', userName = '',isAuthenticated =false } = profile || {};

    // Authentication
    useEffect(() => {
        if (!location.state || !isAuthenticated) {
            navigate('/404', { replace: true });
        }

        console.log("Home Use Effect ->", userEmail, userName, isAuthenticated);


        categoryHandler(userEmail)


    }, [location, isAuthenticated, navigate]);

    // if (!isAuthenticated || !profile) {
    //     return null; 
    // }

    useEffect(() => {
        console.log("Home -> currentCategory has been updated:", currentCategory);
    }, [currentCategory]);


    const categoryHandler = async (email) => {
        try {
            const categoryDataAPI = await fetchCategories(email);
            console.log('categoryDataAPI Home Screen', categoryDataAPI);

            if (categoryDataAPI.length === 0) {
                console.log('Home Screen : No data for this user, creating default category.');

                const newCategory = await createCategory({
                    name: 'Home',
                    slug: slugify('Home'),
                    email,
                });

                console.log('New Category', newCategory);
                setCurrentCategory(newCategory._id)
                console.log("current category -> Home ",currentCategory);
            } else {

                console.log("categoryDataAPI[0]",categoryDataAPI[0]._id);

            
                setCurrentCategory(categoryDataAPI[0]._id)
                console.log("current category -> Home ",currentCategory);

            }
        } catch (error) {
            console.error('Error loading categories Home Screen:', error);
        }
    };

    return (
        <div className="flex flex-row max-w-screen max-h-screen items-center justify-between p-10 bg-gray-100">

            <Category currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                userEmail={userEmail} 
                userName={userName}
                 isAuthenticated={isAuthenticated} />

            <Todo currentCategory={currentCategory}
                userEmail={userEmail} 
                
                userName={userName} 
                isAuthenticated={isAuthenticated} />
            { <Welcome userName={userName}/>}
        </div>
    );
};

export default Home;
