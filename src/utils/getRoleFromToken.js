import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; 
  } catch (err) {
    return null;
  }
};
