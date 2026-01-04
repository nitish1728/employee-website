import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../javascript/authentication";

export default function Protected({ children }) {
    console.log("Protected component rendered");
  return isAuthenticated() ? children : <Navigate to="/login" />;
}