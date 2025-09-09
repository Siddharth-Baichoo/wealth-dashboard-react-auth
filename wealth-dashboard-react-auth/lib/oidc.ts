import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const OIDC_ISSUER = process.env.OIDC_ISSUER || "http://localhost:8070/realms/fintech";
export const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || "wealth-dashboard";
export const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || "http://localhost:3000/api/auth/callback";
export const OIDC_POST_LOGOUT_REDIRECT_URI =
  process.env.OIDC_POST_LOGOUT_REDIRECT_URI || "http://localhost:3000";

const AUTH_ENDPOINT = `${OIDC_ISSUER}/protocol/openid-connect/auth`;
const TOKEN_ENDPOINT = `${OIDC_ISSUER}/protocol/openid-connect/token`;
const LOGOUT_ENDPOINT = `${OIDC_ISSUER}/protocol/openid-connect/logout`;

function b64url(buf: Buffer) {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeJwtPayload(idToken: string) {
  const parts = idToken.split(".");
  if (parts.length !== 3) return null;
  const payload = Buffer.from(parts[1], "base64url").toString("utf8");
  try { return JSON.parse(payload); } catch { return null; }
}

export async function login() {
  // PKCE: create verifier/challenge + state
  const verifier = b64url(crypto.randomBytes(32));
  const challenge = b64url(crypto.createHash("sha256").update(verifier).digest());
  const state = b64url(crypto.randomBytes(16));

  const params = new URLSearchParams({
    client_id: OIDC_CLIENT_ID,
    redirect_uri: OIDC_REDIRECT_URI,
    response_type: "code",
    scope: "openid profile email",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });

  const res = NextResponse.redirect(`${AUTH_ENDPOINT}?${params.toString()}`);
  // dev cookies (httpOnly). In prod: set secure:true and proper maxAge/domain.
  res.cookies.set("pkce_verifier", verifier, { httpOnly: true, sameSite: "lax", secure: false, path: "/" });
  res.cookies.set("oauth_state", state, { httpOnly: true, sameSite: "lax", secure: false, path: "/" });
  return res;
}

export async function callback(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";
  const savedState = cookies().get("oauth_state")?.value || "";
  const verifier = cookies().get("pkce_verifier")?.value || "";

  // Basic validation
  if (!code || !verifier || state !== savedState) {
    const res = redirectHome(req);            // 👈 use absolute redirect
    res.cookies.set("pkce_verifier", "", { path: "/", maxAge: 0 });
    res.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  }

  // Exchange code for tokens
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: OIDC_CLIENT_ID,
    code_verifier: verifier,
    code,
    redirect_uri: OIDC_REDIRECT_URI,
  });

  const tokenRes = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const res = redirectHome(req);

  if (!tokenRes.ok) {
    res.cookies.set("pkce_verifier", "", { path: "/", maxAge: 0 });
    res.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  }

  const tokens = await tokenRes.json();

  if (tokens.id_token) {
    res.cookies.set("id_token", tokens.id_token, { httpOnly: true, sameSite: "lax", secure: false, path: "/" });
  }
  if (tokens.access_token) {
    res.cookies.set("access_token", tokens.access_token, { httpOnly: true, sameSite: "lax", secure: false, path: "/" });
  }
  if (tokens.refresh_token) {
    res.cookies.set("refresh_token", tokens.refresh_token, { httpOnly: true, sameSite: "lax", secure: false, path: "/" });
  }

  // Clear PKCE cookies
  res.cookies.set("pkce_verifier", "", { path: "/", maxAge: 0 });
  res.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });

  return res;
}

export async function logout() {
  const idToken = cookies().get("id_token")?.value || "";
  const params = new URLSearchParams({ post_logout_redirect_uri: OIDC_POST_LOGOUT_REDIRECT_URI });
  if (idToken) params.set("id_token_hint", idToken);

  const res = NextResponse.redirect(`${LOGOUT_ENDPOINT}?${params.toString()}`);
  // Clear tokens on logout
  res.cookies.set("id_token", "", { path: "/", maxAge: 0 });
  res.cookies.set("access_token", "", { path: "/", maxAge: 0 });
  res.cookies.set("refresh_token", "", { path: "/", maxAge: 0 });
  return res;
}

function redirectHome(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url)); 
}
