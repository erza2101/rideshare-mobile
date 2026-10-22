import "server-only";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export function githubOAuthIsConfigured() {
  return Boolean(
    process.env.GITHUB_ID &&
      process.env.GITHUB_SECRET &&
      process.env.NEXTAUTH_SECRET &&
      process.env.NEXTAUTH_URL
  );
}

export function getAuthOptions(): NextAuthOptions {
  const clientId = process.env.GITHUB_ID;
  const clientSecret = process.env.GITHUB_SECRET;
  const secret = process.env.NEXTAUTH_SECRET;
  const url = process.env.NEXTAUTH_URL;
  const missing = [
    ["GITHUB_ID", clientId],
    ["GITHUB_SECRET", clientSecret],
    ["NEXTAUTH_SECRET", secret],
    ["NEXTAUTH_URL", url],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (!clientId || !clientSecret || !secret || !url) {
    throw new Error(
      `Konfiguro këto variabla në .env.local për hyrjen me GitHub: ${missing.join(", ")}.`
    );
  }

  return {
    providers: [GitHubProvider({ clientId, clientSecret })],
    secret,
    session: { strategy: "jwt" },
    callbacks: {
      async session({ session, token }) {
        if (session.user && token.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
  };
}
