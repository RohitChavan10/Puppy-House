import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";


import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // or wherever it's located

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-sos"
  element={
    <ProtectedRoute>
      <MySos />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
