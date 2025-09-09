const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function fetcher(path: string) {
  const url = path.startsWith("/") ? `${BASE}${path}` : `${BASE}/${path}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
