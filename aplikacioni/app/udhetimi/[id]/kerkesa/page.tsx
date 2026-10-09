export const instant=false;
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function FaqjaKerkeses({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const udhetim = gjejUdhetimin(id);

if (!udhetim) {
return <main><h1>Udhëtimi nuk u gjet</h1></main>;
}

return (
<main>
<h1>Kërko vend në udhëtim</h1>
<p>{udhetim.nisja} – {udhetim.destinacioni}</p>
<p>Ora: {udhetim.ora}</p>
<form>
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