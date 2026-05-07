import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Buildings from "./pages/Buildings";
import Favorites from "./pages/Favorites";
import BuildingHistory from "./pages/BuildingHistory";
import NewBuilding from "./pages/NewBuilding.jsx";
import EditBuilding from "./pages/EditBuilding.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Buildings />} />
        <Route path="/buildings/:id" element={<BuildingHistory />} />
        {!token && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {token && (
          <>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/buildings/new" element={<NewBuilding />} />
            <Route path="/buildings/:id/edit" element={<EditBuilding />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
