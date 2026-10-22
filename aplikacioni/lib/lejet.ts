import "server-only";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getSql } from "@/lib/db";

export type ProfilAktiv = {
  github_id: string;
  emri: string;
  roli: "udhetar" | "shofer";
};

export async function lexoProfilinAktiv(): Promise<ProfilAktiv | null> {
  const session = await getServerSession(getAuthOptions());
  const githubId = session?.user.id;

  if (!githubId || !/^\d{1,20}$/.test(githubId)) {
    return null;
  }

  const sql = getSql();
  const emri = session.user.name ?? "Përdorues GitHub";

  await sql`
    INSERT INTO profilet (github_id, emri)
    VALUES (${githubId}, ${emri})
    ON CONFLICT (github_id) DO NOTHING
  `;

  const rows = await sql`
    SELECT github_id, emri, roli
    FROM profilet
    WHERE github_id = ${githubId}
    LIMIT 1
  `;
  const profil = rows[0] as
    | { github_id: string; emri: string; roli: string }
    | undefined;

  if (!profil) {
    throw new Error("Profili i përdoruesit nuk u krijua në databazë.");
  }

  if (profil.roli !== "udhetar" && profil.roli !== "shofer") {
    throw new Error("Profili ka një rol të pavlefshëm në databazë.");
  }

  return { ...profil, roli: profil.roli };
}
