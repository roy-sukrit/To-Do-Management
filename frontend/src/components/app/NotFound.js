const NotFound = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
          <p className="text-lg mb-8">It might have been moved, or the URL might be incorrect.</p>
          <a
            href="/"
            className="px-6 py-3 text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  