"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function ReportPhishing() {
  const [formData, setFormData] = useState({
    url: "",
    risk_level: "",
    detected_on: "",
    category: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/add-phishing-site",
        formData
      );
      alert("Phishing site reported successfully!");
      setFormData({
        url: "",
        risk_level: "",
        detected_on: "",
        category: "",
      });
      router.push("/dashboard")
    } catch (error) {
      console.error("Error reporting phishing site:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center font-bold">Report Phishing Site</h2>

        <label className="block mb-2">
          URL:
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="border w-full p-2 mt-1 rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Risk Level:
          <input
            type="text"
            name="risk_level"
            value={formData.risk_level}
            onChange={handleChange}
            className="border w-full p-2 mt-1 rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Detected On:
          <input
            type="date"
            name="detected_on"
            value={formData.detected_on}
            onChange={handleChange}
            className="border w-full p-2 mt-1 rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border w-full p-2 mt-1 rounded"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
