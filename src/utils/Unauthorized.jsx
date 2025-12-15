import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      
   
      <div className="text-9xl mb-6 animate-bounce">🚫</div>

      <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
      
      <p className="text-gray-700 mb-6 text-center">
        You do not have permission to access this page.
      </p>
      
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300"
      >
        Go to Home
      </Link>

    </div>
  );
};

export default Unauthorized;
