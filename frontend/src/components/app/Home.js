import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserState } from '../../contexts/UserContext';
import Category from '../category/Category';
import Todo from '../todo/Todo';
import Welcome from './Welcome';

const Home = () => {
    const navigate = useNavigate(); // Navigation hook
    const location = useLocation(); // Get the location object


    // State to track the currently selected category
    const [currentCategory, setCurrentCategory] = useState(null);

    // Make sure the location.state exists before attempting to access profile
    const { profile } = location.state || {};
    const { userEmail = '', userName = '', isAuthenticated = false } = profile || {};

    // Check if location.state is null or if the user is not authenticated
    useEffect(() => {
        if (!location.state || !isAuthenticated) {
            navigate('/404', { replace: true });
        }
    }, [location, isAuthenticated, navigate]);

    // If not authenticated or state is not valid, don't render the page
    if (!isAuthenticated || !profile) {
        return null; // Avoid rendering while redirecting
    }

    console.log("Home Screen", userEmail, userName, isAuthenticated);

    return (
        <div className="flex flex-row max-w-screen max-h-screen items-center justify-between p-10 bg-gray-100">

            <Category currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                userEmail={userEmail} userName={userName}
                 isAuthenticated={isAuthenticated} />

            <Todo currentCategory={currentCategory}
                userEmail={userEmail} 
                userName={userName} 
                isAuthenticated={isAuthenticated} />
            {userName === "" && <Welcome />}
        </div>
    );
};

export default Home;
