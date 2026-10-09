import Link from "next/link";
import { gjejUdhetimin } from "@/lib/udhetimet";


export default async function FaqjaUdhetimit({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const udhetim = await gjejUdhetimin(id);

if (!udhetim) {
return (
<main className="p-6">
<h1>Udhëtimi nuk u gjet: {id}</h1>
<Link href="/">Kthehu te udhëtimet</Link>
</main>
);
}

return (
<main className="p-6">
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
    <p className="mt-4 font-semibold">Nuk ka vende të lira</p>
  )}
</main>

);
}