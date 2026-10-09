import Link from "next/link";
import type { Udhetim } from "../udhetimet";

export default function KartaUdhetimi({
  udhetim,
}: {
  udhetim: Udhetim;
}) {
  return (
    <article>
      <h2>
        {udhetim.nisja} – {udhetim.destinacioni}
      </h2>
      <p>Ora: {udhetim.ora}</p>
      <p>Vende të lira: {udhetim.vende}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <Link href={`/udhetimi/${udhetim.id}`}>
        Shiko detajet
      </Link>
    </article>
  );
}