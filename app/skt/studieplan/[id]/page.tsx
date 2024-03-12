import { fetchStudieplan } from "@/lib/eapply";
import { Metadata } from "next";
import Studieplan from "@/components/studieplan";

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params) {
  const studieplan = await fetchStudieplan(params.id, "skt");

  return {
    title: studieplan?.title,
  } as Metadata;
}

export default async function SktStudieplanPage({
  params,
}: {
  params: { id: string };
}) {
  return <Studieplan id={params.id} tenant="skt" />;
}
