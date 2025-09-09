"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

type Tx = {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SETTLED" | "FAILED" | string;
  ts: string; // ISO timestamp
};

function formatAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${Number(amount).toFixed(2)}`;
  }
}

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "PENDING"
      ? "bg-yellow-500/20 text-yellow-300"
      : status === "FAILED"
      ? "bg-red-500/20 text-red-300"
      : "bg-green-500/20 text-green-300";
  return <span className={`px-2 py-0.5 rounded text-xs ${cls}`}>{status}</span>;
}

export default function TransactionsPage() {
  const { data, error, isLoading } = useSWR<Tx[]>("/api/payments", fetcher, {
    revalidateOnFocus: false,
  });

  if (isLoading) return <div className="card">Loading transactions...</div>;
  if (error) return <div className="card">Failed to load: {(error as Error).message}</div>;

  const rows = Array.isArray(data) ? data : [];

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
            <th className="pb-2 text-right">Amount</th>
            <th className="pb-2">ID</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tx) => (
            <tr key={tx.id} className="border-t border-white/10">
              <td className="py-2">{new Date(tx.ts).toLocaleString()}</td>
              <td><StatusPill status={tx.status} /></td>
              <td className="text-right">{formatAmount(tx.amount, tx.currency)}</td>
              <td className="opacity-70">{tx.id.slice(0, 8)}…</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="mt-3 opacity-80">No transactions yet.</div>}
    </div>
  );
}
