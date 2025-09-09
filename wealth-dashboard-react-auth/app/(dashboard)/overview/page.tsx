import ChartDemo from "@/components/ChartDemo";

export default function OverviewPage() {
  return (
    <div className="grid gap-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">PnL (Demo)</h2>
        <ChartDemo />
      </div>
      <div className="card">
        <h3 className="font-semibold mb-1">Quick Stats</h3>
        <ul className="list-disc pl-5">
          <li>Accounts linked: 2</li>
          <li>Monthly spend: $3,240</li>
          <li>Alerts this month: 1</li>
        </ul>
      </div>
    </div>
  );
}
