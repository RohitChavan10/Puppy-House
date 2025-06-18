// /src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "user"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register-user", form);
      alert("Registered successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Error registering");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input className="input" name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} className="input">
          <option value="user">User</option>
          <option value="ngo">NGO</option>
        </select>
        <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
