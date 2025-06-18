import { useEffect, useState } from "react";
import axios from "axios";

const SosList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchSosRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/sos/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching SOS requests", err);
      }
    };

    fetchSosRequests();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">📋 Your SOS Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No SOS requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <img
                src={req.image}
                alt="SOS"
                className="w-full max-h-48 object-cover mb-2 rounded"
              />
              <p><strong>Description:</strong> {req.description}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    req.status === "resolved"
                      ? "text-green-600"
                      : req.status === "in-progress"
                      ? "text-yellow-500"
                      : "text-red-500"
                  } font-semibold`}
                >
                  {req.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SosList;
