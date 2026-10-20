import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

type Parametrat = {
  params: Promise<{ id: string }>;
};

export default function FaqjaKerkeses({ params }: Parametrat) {
  return (
    <Suspense
      fallback={
        <main className="p-6">
          <p>Po ngarkohet kërkesa...</p>
        </main>
      }
    >
      <FormaKerkeses params={params} />
    </Suspense>
  );
}

async function FormaKerkeses({ params }: Parametrat) {
  const { id } = await params;
  await connection();
  let udhetim;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimit për kërkesën:", error);

    return (
      <main className="p-6">
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  if (udhetim.vende <= 0) {
    return (
      <main className="p-6">
        <Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
        <h1>Nuk ka vende të lira</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
      <h1>Simulim: Në pritje</h1>
      <p>
        Kërkesa për {udhetim.nisja} nuk është dërguar te shoferi.
      </p>
      <p>Ruajtjen dhe konfirmimin real do t’i shtojmë më vonë.</p>
    </main>
  );
}