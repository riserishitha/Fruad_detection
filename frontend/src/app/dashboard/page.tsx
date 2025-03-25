"use client";
import FraudAppsList from "@/app/component/FraudAppsList";
import FraudUrlsList from "@/app/component/FraudUrlsList";
import TrendChart from "@/app/component/TrendChart";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to enter dashboard");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fraud Monitoring Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>
      <FraudAppsList />
      <FraudUrlsList />
      <TrendChart />
    </div>
  );
}
