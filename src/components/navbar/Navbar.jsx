import React from "react";
import { NavLink } from "react-router-dom";
import { getRoleFromToken } from "../../utils/getRoleFromToken";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = token ? getRoleFromToken(token) : null;
  const navigate = useNavigate()

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Projects
          </NavLink>
          {(role === "admin" || role === "manager") && (
           
              <NavLink
                to="/create-project"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Create Project
              </NavLink>
          )}
          {(role === "admin") && (
              <NavLink
                to="/create-user"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                Create User
              </NavLink>
          )}
          {(role === "admin" || role === "manager") && (
              <NavLink
                to="/all-users"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600"
                }
              >
                All User
              </NavLink>
          )}
          
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-pink-600 font-semibold">
  {role?.toUpperCase() || ""}
</span>


          <button
            className="text-sm px-4 py-1.5 cursor-pointer rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              dispatch(logout());
              navigate("/login")
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
