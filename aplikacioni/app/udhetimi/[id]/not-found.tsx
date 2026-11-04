"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function UdhetimiNukUgjet() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="p-6">
      <h1>Udhëtimi nuk u gjet: {id}</h1>
      <p>ID-ja nuk përputhet me asnjë udhëtim.</p>
      <Link href="/">← Kthehu te lista</Link>
    </main>
  );
}
