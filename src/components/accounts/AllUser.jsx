import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getRoleFromToken } from "../../utils/getRoleFromToken";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = token ? getRoleFromToken(token) : null;

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">#</th>

              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
              {role === "admin" && <th className="px-4 py-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users
                .filter((user) => {
                  
                  if (role === "manager" && user.role === "admin") return false;
                  return true; 
                })
                .map((user, index) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50 ">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : user.role === "manager"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>

                    {role === "admin" && (
                      <td>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 items-center text-white font-sembold rounded-xl px-1 py-0.5 cursor-pointer text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
