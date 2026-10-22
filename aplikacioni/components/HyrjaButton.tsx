"use client";

import { signIn, signOut } from "next-auth/react";

export default function HyrjaButton({
  emri,
}: {
  emri?: string | null;
}) {
  return emri ? (
    <div>
      <span>Hyrë si {emri}. </span>
      <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
        Dil
      </button>
    </div>
  ) : (
    <button type="button" onClick={() => signIn("github")}>
      Hyr me GitHub
    </button>
  );
}
