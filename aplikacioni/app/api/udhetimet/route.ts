import { NextResponse } from "next/server";
import { connection } from "next/server";
import { lexoUdhetimet } from "@/lib/udhetimet";

export async function GET() {
  await connection();

  try {
    const udhetimet = await lexoUdhetimet();

    const trips = udhetimet.map((udhetim) => ({
      id: udhetim.id,
      nisja: udhetim.nisja,
      destinacioni: udhetim.destinacioni,
      ora: udhetim.ora,
      vendtakimi: udhetim.vendtakimi,
      vende: udhetim.vende,
    }));

    return NextResponse.json(
      { trips },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimeve:", error);

    return NextResponse.json(
      { error: "Lista nuk mund të lexohet tani." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}