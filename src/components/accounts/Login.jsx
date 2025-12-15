import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  
  const onSubmit = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/api/login", data)

        dispatch(loginSuccess(response.data.token))
        toast.success(response.data.message)
        navigate("/")
    } catch (error) {
         toast.error(
      error.response?.data?.err || "Login failed"
    );
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-2 border border-gray-300 rounded"
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

       
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-2 border border-gray-300 rounded"
          {...register("password", { 
            required: "Password is required", 
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

     
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

