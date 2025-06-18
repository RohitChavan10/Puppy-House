// /src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // inside Login component
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login-user", form);
    const { token } = res.data;
    localStorage.setItem("token", token);
    alert("Login successful");
    navigate("/dashboard"); // ✅ Redirect after login
  } catch (err) {
    alert("Login failed");
    console.error(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="bg-green-600 text-white py-2 px-4 rounded mt-4 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
