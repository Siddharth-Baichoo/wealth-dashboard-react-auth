import { logout } from "@/lib/oidc";
export const runtime = "nodejs";

export async function GET() {
  return logout();
}
