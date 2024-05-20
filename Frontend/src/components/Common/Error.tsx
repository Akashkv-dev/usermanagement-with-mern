import { useLocation, useNavigate } from "react-router-dom";

export const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-white">Oops! Page Not Found</h1>
      <p className="mt-4 text-xl text-white">We can't find the page you're looking for.</p>
      <p className="mt-2 text-md text-white">No match for <code className="bg-gray-600 p-1 rounded">{location.pathname}</code></p>
      <button 
        className="mt-8 px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300"
        onClick={handleGoHome}
      >
        Go Home
      </button>
    </div>
  );
}
