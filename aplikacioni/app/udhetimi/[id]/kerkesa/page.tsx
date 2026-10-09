import { gjejUdhetimin } from "@/lib/udhetimet";


export default async function FaqjaKerkeses({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const udhetim = await gjejUdhetimin(id);

if (!udhetim) {
return (
<main className="p-6">
<h1>Udhëtimi nuk u gjet</h1>
</main>
);
}

if (udhetim.vende <= 0) {
return (
<main className="p-6">
<h1>Nuk ka vende të lira</h1>
</main>
);
}

return (
<main className="p-6">
<h1>Kërko vend në udhëtim</h1>
<p>{udhetim.nisja} – {udhetim.destinacioni}</p>
<p>Ora: {udhetim.ora}</p>

  <form action={`/udhetimi/${id}/kerkesa`} method="get">
    <label>
      Emri:
      <input name="emri" required />
    </label>
    <br />
    <label>
      Numri i telefonit:
      <input name="telefoni" type="tel" required />
    </label>
    <br />
    <button type="submit">Dërgo kërkesën</button>
  </form>
</main>

);
}