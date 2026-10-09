import Link from "next/link";

type Udhetim = {
  id: string | number;
  nisja: string;
  destinacioni: string;
  ora: string;
  vende: number | string;
  vendtakimi: string;
};

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