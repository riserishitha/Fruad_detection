"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function FraudAppsList() {
  const [apps, setApps] = useState([]);
  const router = useRouter();

  const fetchApps = async () => {
    try {
      const res = await axios.get("http://localhost:3003/get-fraud-apps");
      setApps(res.data);
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleInvestigate = async (appId: string, appName: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3003/investigate-app/${appId}`
      );
      toast.success(`${appName} marked under investigation`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      fetchApps();
    } catch (error) {
      console.error("Error investigating app:", error);
      toast.error("Error investigating app", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleBlock = async (appId: string, appName: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3003/block-app/${appId}`
      );
      toast.success(`${appName} has been blocked`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      fetchApps();
    } catch (error) {
      console.error("Error blocking app:", error);
      toast.error("Error blocking app", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Fraudulent Apps List</h2>
      <table className="w-full border border-gray-300 shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">App Name</th>
            <th className="p-2 border">Developer</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Risk Level</th>
            <th className="p-2 border">Reported On</th>
            <th className="p-2 border">Block</th>
            <th className="p-2 border">Investigate</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app: any, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-center">{app.app_name}</td>
              <td className="px-4 py-2 text-center">{app.developer}</td>
              <td className="px-4 py-2 text-center">{app.category}</td>
              <td className="px-4 py-2 text-center">{app.risk_level}</td>
              <td className="px-4 py-2 text-center">{app.reported_on?.split("T")[0]}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleBlock(app._id, app.app_name)}
                  disabled={app.block_status}
                  className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 cursor-pointer ${
                    app.block_status
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {app.block_status ? "Blocked" : "Block"}
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() =>
                    handleInvestigate(app._id, app.app_name)
                  }
                  disabled={app.investigation_status}
                  className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 cursor-pointer ${
                    app.investigation_status
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                >
                  {app.investigation_status
                    ? "Investigated"
                    : "Investigate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/Add")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-300 cursor-pointer"
        >
          Add New Fraud App
        </button>
      </div>
    </div>
  );
}
