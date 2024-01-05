import { fetchStudieplansForIndex } from "@/lib/eapply";
import algoliasearch from "algoliasearch";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const data = await fetchStudieplansForIndex("skt");

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!
  );

  const index = client.initIndex("studieplaner");

  index.saveObjects(data).wait();

  // TODO: Delete unused objects

  return Response.json({ updated: data.length, deleted: 0 });
}
