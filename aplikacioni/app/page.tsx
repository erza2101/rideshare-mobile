import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";
import KartaUdhetimi from "@/lib/components/KartaUdhetimi";

export default function Home() {
  return (
    <main>
      <h1>RideShare · Udhëtimet për AAB</h1>
      <p>Zgjidh një nisje dhe lexo detajet para kërkesës.</p>

      <Suspense fallback={<p>Po ngarkohen udhëtimet...</p>}>
        <ListaUdhetimeve />
      </Suspense>
    </main>
  );
}

async function ListaUdhetimeve() {
  await connection();

  let udhetimet: Udhetim[];

  try {
    udhetimet = await lexoUdhetimet();
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimeve:", error);

    return (
      <section>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">Provo përsëri</Link>
      </section>
    );
  }

  if (udhetimet.length === 0) {
    return <p>Nuk ka udhëtime për momentin.</p>;
  }

  return (
    <div className="trip-list">
      {udhetimet.map((udhetim) => (
        <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
      ))}
    </div>
  );
}