import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import data from "@/app/data/assignment.json";

export default function TrendChart() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">30-Day Fraud Trend Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.fraud_trends_30_days}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="fraud_cases_detected" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
