import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage"; 
import Loginpage from "../pages/login/Login";
import Signuppage from "../pages/signup/Signup"; 
import PropertyPage from '../pages/property/PropertyPage';
import FavouritesPage from '../pages/Favourites/favourites';
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
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
