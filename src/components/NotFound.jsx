import '../assets/styles/NotFound.css';
import { Routes, Route, Navigate } from "react-router-dom";
export default function NotFound() {
  return (
    <>
        <div className="not-found">
            <span>404</span>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <a href="/login">Go to Login Page</a>
        </div>
        <Routes>
            <Route path="/login" element={<Navigate to="/login" />} />
        </Routes>
    </>
  )
}