"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PhishingUrl {
  _id: string;
  url: string;
  risk_level: string;
  detected_on: string;
  category: string;
  isBlocked?: boolean;
  isInvestigated?: boolean;
}

export default function FraudUrlsList() {
  const [urls, setUrls] = useState<PhishingUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get("http://localhost:3003/get-phishing-sites");
        setUrls(response.data);
      } catch (err) {
        setError("Error fetching URLs");
        toast.error("Error fetching URLs");
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  const handleInvestigate = async (urlId: string, urlName: string) => {
    try {
      const response = await axios.put(`http://localhost:3003/investigate-url/${urlId}`);
      if (response.data.message === "Already marked for investigation") {
        toast.warning(`${urlName} is already under investigation`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.success(`${urlName} is now under investigation`, {
          position: "top-right",
          autoClose: 3000,
        });
        const updatedUrls = await axios.get("http://localhost:3003/get-phishing-sites");
        setUrls(updatedUrls.data);
      }
    } catch (error) {
      toast.error(`Error investigating ${urlName}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleBlock = async (urlId: string, urlName: string) => {
    try {
      const response = await axios.put(`http://localhost:3003/block-url/${urlId}`);
      if (response.data.message === "Already blocked") {
        toast.warning(`${urlName} is already blocked`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.success(`${urlName} successfully blocked`, {
          position: "top-right",
          autoClose: 3000,
        });
        const updatedUrls = await axios.get("http://localhost:3003/get-phishing-sites");
        setUrls(updatedUrls.data);
      }
    } catch (error) {
      toast.error(`Error blocking ${urlName}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) return <p>Loading URLs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Fraudulent URLs List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">URL</th>
              <th className="border p-2">Risk Level</th>
              <th className="border p-2">Detected On</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Block</th>
              <th className="border p-2">Investigate</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
              urls.map((url) => (
                <tr key={url._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{url.url}</td>
                  <td className="px-4 py-2 text-center">{url.risk_level}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(url.detected_on).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">{url.category}</td>
                  <td className="px-4 py-2 text-center">
                  <button
                  onClick={() => handleBlock(url._id, url.url)}
                  disabled={url.block}
                  className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 cursor-pointer ${
                    url.block
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {url.block ? "Blocked" : "Block"}
                </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                  <button
                  onClick={() =>
                    handleInvestigate(url._id, url.url)
                  }
                  disabled={url.investigate}
                  className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 cursor-pointer ${
                    url.investigate
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                >
                  {url.investigate
                    ? "Investigated"
                    : "Investigate"}
                </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-gray-500">
                  No fraudulent URLs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/AddUrls")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-300 cursor-pointer"
        >
          Import Fraud URLs
        </button>
      </div>
    </div>
  );
}
