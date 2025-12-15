import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
 const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      
     const response = await axios.post(
        "https://techplek-backend.onrender.com/api/create-project",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(response.data.message);
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.err || "Project creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border">
        
     
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Create New Project
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the details below to create a project
          </p>
        </div>

      
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Title..."
              {...register("title", {
                required: "Title is required"
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="5"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Describe your project in detail..."
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required"
                }
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
