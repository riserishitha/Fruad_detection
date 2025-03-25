"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

export default function AddFraudApp() {
  const [formData, setFormData] = useState({
    app_name: "",
    developer: "",
    category: "",
    risk_level: "",
    reported_on: "",
  });
  const router = useRouter();

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3003/add-fraud-app", formData);
      toast.success("Fraud app added successfully!", { position: "top-right" });
      setFormData({
        app_name: "",
        developer: "",
        category: "",
        risk_level: "",
        reported_on: "",
      });
      router.push("/dashboard")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { position: "top-right" });
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Fraudulent App</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="app_name"
          value={formData.app_name}
          onChange={handleChange}
          placeholder="App Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="developer"
          value={formData.developer}
          onChange={handleChange}
          placeholder="Developer"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="risk_level"
          value={formData.risk_level}
          onChange={handleChange}
          placeholder="Risk Level"
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="reported_on"
          value={formData.reported_on}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl shadow-md transition-all duration-300"
        >
          Add Fraud App
        </button>
      </form>
    </div>
  );
}
