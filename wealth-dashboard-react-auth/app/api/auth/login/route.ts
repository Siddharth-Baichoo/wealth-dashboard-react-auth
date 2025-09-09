import { login } from "@/lib/oidc";
export const runtime = "nodejs";

export async function GET() {
  return login();
}

