export const maxDuration = 30;

import { fetchStudieplansForIndex } from "@/lib/eapply";
import { algoliasearch } from "algoliasearch";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const dataFunkis = await fetchStudieplansForIndex("funkis");
  const dataSkt = await fetchStudieplansForIndex("skt");
  const data = [...dataFunkis, ...dataSkt];

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!
  );

  const indexName = "studieplaner";

  await client.replaceAllObjects({ indexName, objects: data });

  return Response.json({ updated: data.length });
}
