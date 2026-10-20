import { NextResponse } from "next/server";
import { connection } from "next/server";
import { lexoUdhetimet } from "@/lib/udhetimet";

export async function GET() {
  await connection();

  try {
    return NextResponse.json(await lexoUdhetimet());
  } catch (error) {
    console.error("Gabim gjatë leximit të udhëtimeve:", error);

    return NextResponse.json(
      { error: "Nuk mund të lexohen udhëtimet." },
      { status: 500 }
    );
  }
}