import "server-only";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { getAuthOptions, githubOAuthIsConfigured } from "@/lib/auth";
import HyrjaButton from "@/components/HyrjaButton";

export default async function Hyrja() {
  if (!githubOAuthIsConfigured()) {
    return (
      <p role="status">
        Hyrja me GitHub aktivizohet pasi të konfigurohen variablat OAuth në
        `.env.local`.
      </p>
    );
  }

  await connection();
  const session = await getServerSession(getAuthOptions());

  return <HyrjaButton emri={session?.user.name} />;
}
