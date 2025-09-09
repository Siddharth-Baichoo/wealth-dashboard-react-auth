import { cookies } from "next/headers";
import { decodeJwtPayload } from "../lib/oidc";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

export default function AuthStatus() {
  const idToken = cookies().get("id_token")?.value;
  if (!idToken) return <LoginButton />;

  const claims = decodeJwtPayload(idToken) || {};
  const name = claims.name || claims.preferred_username || "User";
  return (
    <div className="flex items-center gap-3">
      <span className="opacity-90">Hi, {name}</span>
      <LogoutButton />
    </div>
  );
}
