import Link from "next/link";
export default function Home() {
  return (
    <section className="card">
      <h2 className="text-xl mb-2 font-semibold">Welcome</h2>
      <p>Use Login to authenticate via Keycloak, then explore:</p>
      <ul className="list-disc pl-5 mt-2">
        <li><Link href="/overview">Overview</Link></li>
        <li><Link href="/transactions">Transactions</Link></li>
        <li><Link href="/alerts">Alerts</Link></li>
        <li><Link href="/analytics">Analytics</Link></li>
      </ul>
    </section>
  );
}
