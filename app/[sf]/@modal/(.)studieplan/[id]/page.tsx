import { fetchStudieplan } from "@/lib/eapply";
import { Metadata } from "next";
import Studieplan from "@/components/studieplan";
import { Modal } from "./modal";
import { notFound } from "next/navigation";

interface Params {
  params: { id: string; sf: string };
}

export async function generateMetadata({ params }: Params) {
  const studieplan = await fetchStudieplan(params.id, params.sf);

  return {
    title: studieplan?.title,
  } as Metadata;
}

export default async function StudieplanPage({ params }: Params) {
  const studieplan = await fetchStudieplan(params.id, params.sf);

  if (!studieplan) notFound();

  return (
    <Modal title={studieplan.title}>
      <Studieplan id={params.id} tenant={params.sf} modal />
    </Modal>
  );
}
