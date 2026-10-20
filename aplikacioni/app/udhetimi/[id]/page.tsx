import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

type Parametrat = {
  params: Promise<{ id: string }>;
};

export default function FaqjaUdhetimit({ params }: Parametrat) {
  return (
    <Suspense
      fallback={
        <main className="p-6">
          <p>Po ngarkohet udhëtimi...</p>
        </main>
      }
    >
      <DetajetUdhetimit params={params} />
    </Suspense>
  );
}

async function DetajetUdhetimit({
  params,
}: {
  params: Parametrat["params"];
}) {
  const { id } = await params;
  await connection();
  let udhetim;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimit:", error);

    return (
      <main className="p-6">
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main className="p-6">
      <Link href="/">← Kthehu te lista</Link>
      <h1>
        {udhetim.nisja} – {udhetim.destinacioni}
      </h1>

      <p>Ora: {udhetim.ora}</p>
      <p>Vende të lira: {udhetim.vende}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>

      {udhetim.vende > 0 ? (
        <Link
          href={`/udhetimi/${id}/kerkesa`}
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          Kërko vend
        </Link>
      ) : (
        <button className="mt-4 font-semibold" disabled>
          Nuk ka vende të lira
        </button>
      )}
    </main>
  );
}