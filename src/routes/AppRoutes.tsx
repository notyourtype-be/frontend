import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage"; 
import Loginpage from "../pages/login/Login";
import Signuppage from "../pages/signup/Signup"; 
import ProtectedRoute from "./ProtectedRoute";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
          <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} /> 

      </Routes>
    </Router>
  );
};

export default AppRoutes;
