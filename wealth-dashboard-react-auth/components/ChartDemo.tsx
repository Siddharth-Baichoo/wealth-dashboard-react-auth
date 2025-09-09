"use client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", pnl: 400 },
  { name: "Feb", pnl: 300 },
  { name: "Mar", pnl: 600 },
  { name: "Apr", pnl: 200 },
  { name: "May", pnl: 800 },
  { name: "Jun", pnl: 700 },
];

export default function ChartDemo() {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <Line type="monotone" dataKey="pnl" stroke="#82ca9d" />
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
