import { useState } from "react";
import axios from "axios";

const SosForm = () => {
  const [form, setForm] = useState({
    image: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/sos/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ SOS submitted!");
      setForm({ image: "", description: "", location: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Error submitting SOS.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-4">🐾 Report SOS</h2>

      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full mb-4 p-2 border rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe the situation"
        className="w-full mb-4 p-2 border rounded"
        rows="3"
      />

      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Enter location"
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit SOS
      </button>
    </form>
  );
};

export default SosForm;
