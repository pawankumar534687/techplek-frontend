import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoleFromToken } from "../../utils/getRoleFromToken";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const role = token ? getRoleFromToken(token) : null;

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/all-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data);
    
    } catch (error) {
      toast.error(error.response?.data?.err || "Failed to get all projects");
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete-project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.err || "Project delete failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (!projects) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Projects</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Created By</th>
              {(role === "admin" || role === "manager") && (
                <th className="px-4 py-3">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={project._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {project.title}
                  </td>
                  <td className="px-4 py-3">{project.description}</td>
                  <td className="px-4 py-3">{project.createdBy?.email} ({project.createdBy?.role} )</td>
                  <td className="px-4 py-3 flex gap-2">
                    {(role === "admin" || role === "manager") && (
                      <Link
                        to={`/edit-product/${project._id}`}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                    )}
                    {role === "admin" && (
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="px-3 py-1 bg-red-500 cursor-pointer text-white text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
