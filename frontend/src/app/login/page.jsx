"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/login", {
        username: username,
        password: password,
      });
      console.log("Login Success:", response.data);
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-500 to-blue-500">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Username</label>
          <input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
