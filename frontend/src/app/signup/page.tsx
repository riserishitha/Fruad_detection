"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/register", {
        username: name,
        password: password,
      });
      console.log("Register Success:", response.data);
      alert("Register successful!");
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Rgister Error:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Register failed");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-500 to-blue-500">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
          />
        </div>
        <p className="mt-4 text-center text-gray-600 mb-5">
          Already have an account?{" "}
          <button
            type="button"
            className="text-green-500 underline"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </p>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
