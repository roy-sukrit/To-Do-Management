import { useState } from 'react';

export default function Welcome({ userName }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false); // Hide the popup
    };

    if (!isVisible) return null; // Render nothing if the popup is closed

    return (
        // wrapper
        <div className="absolute grid place-items-center inset-0 w-screen h-full z-10 bg-gray-900/[.2]">
            {/* modal */}
            <div
                className="flex flex-col w-96 h-96 bg-white 
                rounded-xl justify-center items-center p-10 shadow-2xl 
                transform transition duration-500 hover:scale-105"
            >
                <div className="flex flex-col place-items-center">
                    {/* Animated Emoji */}
                    <div className="text-5xl animate-bounce">🎉</div>

                    {/* Greeting */}
                    <p className="text-black text-2xl my-3">
                        Hello, {userName}! 👋
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 text-center">
                        Welcome! We're excited to have you here. Let's get started 🚀.
                    </p>

                    {/* Button */}
                    <button
                        className="my-3 bg-gradient-to-r from-rose-500 to-red-600 text-white 
                        font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl 
                        transition-transform transform hover:scale-110"
                        onClick={handleClose}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
