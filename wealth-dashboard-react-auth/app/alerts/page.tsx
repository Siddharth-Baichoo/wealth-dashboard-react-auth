"use client";

import { fetcher } from "@/lib/api";
import useSWR from "swr";

type Alert = { id: string; type: string; createdAt: string; severity: "low"|"medium"|"high" };

export default function AlertsPage() {
  const { data, error, isLoading } = useSWR<Alert[]>("/api/alerts?since=30d", fetcher);
  if (isLoading) return <div className="card">Loading alerts...</div>;
  if (error) return <div className="card">Failed to load</div>;

  return (
    <div className="grid gap-4">
      {(data ?? []).map((a) => (
        <div key={a.id} className="card">
          <div className="flex justify-between">
            <div><strong>{a.type}</strong></div>
            <div className="opacity-80">{new Date(a.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-1">Severity: {a.severity}</div>
        </div>
      ))}
      {(data ?? []).length === 0 && <div className="card">No alerts 🎉</div>}
    </div>
  );
}
