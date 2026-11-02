"use client";

import { useEffect } from "react";

export default function Pwa() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;
    let warming = false;

    async function warmSnapshot() {
      if (
        cancelled ||
        warming ||
        !navigator.serviceWorker.controller
      ) {
        return;
      }

      warming = true;

      try {
        const response = await fetch("/api/udhetimet", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Kërkesa për kopjen offline dështoi: ${response.status}`);
        }
      } catch (error) {
        console.error("Nuk u përditësua kopja offline e udhëtimeve:", error);
      } finally {
        warming = false;
      }
    }

    navigator.serviceWorker.addEventListener("controllerchange", warmSnapshot);
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(() => navigator.serviceWorker.ready)
      .then(warmSnapshot)
      .catch((error: unknown) => {
        console.error("Nuk u regjistrua service worker-i:", error);
      });

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        warmSnapshot
      );
    };
  }, []);

  return (
    <aside className="p-4">
      <a href="/offline.html">Lista për lexim pa internet</a>
      <p>Kopja e ruajtur mund të jetë e vjetër. Këtu nuk konfirmohen rezervime.</p>
    </aside>
  );
}
