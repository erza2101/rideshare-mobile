import { gjejUdhetimin } from "@/lib/udhetimet";

export const instant = false;

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
</main>
);
}