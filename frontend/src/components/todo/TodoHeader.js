import { FaRegHeart } from "react-icons/fa";
import { getDate, getDay, getGreeting, getMonth } from '../../functions/getDate';
import './TodoHeader.css'; // Import CSS for animations
import { useNavigate } from 'react-router-dom';

export default function TodoHeader({ userName, userEmail, isAuthenticated }) {
    const navigate = useNavigate();  // Use navigate hook correctly

    const onLogout = (e) => {
        e.preventDefault();  // Prevent the default action

        // Add your logout logic here (e.g., clear user data, tokens, etc.)

        // Redirect to '/all' after logout
        navigate('/all');
    };

    return (
        <header className="flex flex-col md:flex-row items-center justify-between w-full p-4 bg-transparent">
            {/* Left Section: Heart Icon and Greeting */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                {/* Heart Icon */}
                <div className="text-4xl md:text-5xl text-rose-500">
                    <FaRegHeart />
                </div>
                {/* Greeting */}
                <div>
                    <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
                        Good {getGreeting()}, {userName}{" "}
                        <span className="animate-wave">👋</span>
                    </p>
                    <p className="text-sm md:text-lg font-light text-gray-500">
                        It's {getDay()}day, {getMonth()} {getDate()}
                    </p>
                </div>
            </div>

            {/* Logout Button */}
            <button
                className="bg-rose-500 hover:bg-rose-600 text-white text-sm md:text-base font-medium py-2 px-4 rounded shadow transition-all"
                onClick={onLogout}  // Correctly call the onLogout function
            >
                Logout
            </button>
        </header>
    );
}
