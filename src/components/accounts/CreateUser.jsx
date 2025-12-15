import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateUser = () => {
  const navigate = useNavigate();

const token = useSelector((state) => state.auth.token);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      
     const response =  await axios.post(
        "http://localhost:8000/api/create-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("User created successfully");
      reset();
      navigate("/all-users");
    } catch (error) {
      toast.error(error.response?.data?.err || "User creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border">

        
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Create New User
          </h2>
          <p className="text-sm text-gray-500">
            Add a new user and assign a role
          </p>
        </div>

      
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("email", {
                required: "Email is required"
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temporary Password
            </label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Role
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
