import type { NextRequest } from "next/server";
import { callback } from "@/lib/oidc";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return callback(req);
}
