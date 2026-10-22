"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function ndryshoOren(formData: FormData) {
  const session = await getServerSession(getAuthOptions());
  const githubId = session?.user.id;

  if (!githubId || !/^\d{1,20}$/.test(githubId)) {
    redirect("/panel?status=auth");
  }

  const id = formData.get("udhetimId");
  const ora = formData.get("ora");

  if (
    typeof id !== "string" ||
    !/^[1-9]\d{0,5}$/.test(id) ||
    typeof ora !== "string" ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(ora)
  ) {
    redirect("/panel?status=invalid");
  }

  let rows: { id: string }[];

  try {
    const sql = getSql();
    rows = (await sql`
      UPDATE udhetimet
      SET ora = ${ora}
      WHERE id = ${id}
        AND shofer_id = ${githubId}
        AND EXISTS (
          SELECT 1
          FROM profilet
          WHERE github_id = ${githubId}
            AND roli = 'shofer'
        )
      RETURNING id::text AS id
    `) as { id: string }[];
  } catch (error) {
    console.error("Gabim gjatë ndryshimit të orës së udhëtimit:", error);
    redirect("/panel?status=error");
  }

  if (rows.length === 0) {
    redirect("/panel?status=forbidden");
  }

  revalidatePath("/");
  revalidatePath("/panel");
  revalidatePath(`/udhetimi/${id}`);
  redirect("/panel?status=updated");
}
