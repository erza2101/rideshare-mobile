import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getServerSession } from "next-auth";
import HyrjaButton from "@/components/HyrjaButton";
import { getAuthOptions, githubOAuthIsConfigured } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { lexoProfilinAktiv } from "@/lib/lejet";
import { ndryshoOren } from "./actions";

type PanelPageProps = {
  searchParams: Promise<{ status?: string }>;
};

const mesazhet: Record<string, string> = {
  auth: "Hyr përsëri me GitHub për të vazhduar.",
  error: "Ora nuk u ruajt për shkak të një gabimi në databazë.",
  forbidden: "Nuk ke leje për ta ndryshuar këtë udhëtim.",
  invalid: "ID-ja e udhëtimit ose ora nuk është e vlefshme.",
  updated: "Ora u ruajt me sukses.",
};

export default function PanelPage({ searchParams }: PanelPageProps) {
  return (
    <main>
      <Link href="/">← Kthehu te udhëtimet</Link>
      <h1>Paneli i shoferit</h1>
      <Suspense fallback={<p>Po ngarkohet paneli...</p>}>
        <Paneli searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Paneli({ searchParams }: PanelPageProps) {
  const { status } = await searchParams;
  await connection();

  if (!githubOAuthIsConfigured()) {
    return (
      <p role="alert">
        Për të përdorur panelin, konfiguro hyrjen me GitHub në `.env.local`.
      </p>
    );
  }

  let profil;

  try {
    profil = await lexoProfilinAktiv();
  } catch (error) {
    console.error("Gabim gjatë ngarkimit të profilit të panelit:", error);
    return (
      <p role="alert">
        Nuk mund të ngarkohej profili. Kontrollo lidhjen me databazën dhe skemën
        e Javës 5.
      </p>
    );
  }

  if (!profil) {
    const session = await getServerSession(getAuthOptions());

    return (
      <section>
        <p>
          {session
            ? "Profili GitHub nuk mund të verifikohej."
            : "Hyr me GitHub për të parë panelin."}
        </p>
        {!session && <HyrjaButton />}
      </section>
    );
  }

  if (profil.roli !== "shofer") {
    return (
      <section>
        <p>
          Mirë se erdhe, {profil.emri}. Roli yt aktual është udhëtar; vetëm
          shoferët mund të ndryshojnë orarin.
        </p>
        {status && mesazhet[status] && <p role="status">{mesazhet[status]}</p>}
      </section>
    );
  }

  let udhetimet: { id: string; nisja: string; destinacioni: string; ora: string }[];

  try {
    const sql = getSql();
    udhetimet = (await sql`
      SELECT id::text AS id, nisja, destinacioni, ora
      FROM udhetimet
      WHERE shofer_id = ${profil.github_id}
      ORDER BY id
    `) as typeof udhetimet;
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimeve të shoferit:", error);
    return (
      <p role="alert">
        Nuk mund të ngarkoheshin udhëtimet e tua. Provo përsëri.
      </p>
    );
  }

  return (
    <section>
      <p>Mirë se erdhe, {profil.emri}. Roli yt: shofer.</p>
      {status && mesazhet[status] && <p role="status">{mesazhet[status]}</p>}
      {udhetimet.length === 0 ? (
        <p>Nuk ke udhëtime të caktuara në profilin tënd.</p>
      ) : (
        <ul>
          {udhetimet.map((udhetim) => (
            <li key={udhetim.id}>
              <h2>
                {udhetim.nisja} – {udhetim.destinacioni}
              </h2>
              <p>Ora aktuale: {udhetim.ora}</p>
              <form action={ndryshoOren}>
                <input
                  type="hidden"
                  name="udhetimId"
                  value={udhetim.id}
                />
                <label>
                  Ora e re
                  <input
                    type="time"
                    name="ora"
                    defaultValue={udhetim.ora}
                    required
                  />
                </label>
                <button type="submit">Ruaj orën</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
