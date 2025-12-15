import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

 
  const fetchProject = async () => {
    try {
      const response = await axios.get(`https://techplek-backend.onrender.com/api/get-project-data/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const project = response.data;

      
      setValue("title", project.title);
      setValue("description", project.description);

      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.err || "Failed to fetch project");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);




  
  const onSubmit = async (data) => {
    try {
      await axios.put(
        `https://techplek-backend.onrender.com/api/edit-project/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Project updated successfully");
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.err || "Project update failed");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default ProjectEdit;
