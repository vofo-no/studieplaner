import { fetchStudieplan } from "@/lib/eapply";
import Studieplan from "@/components/studieplan";
import { Modal } from "./modal";
import { notFound } from "next/navigation";

interface Params {
  params: { id: string; sf: string };
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
