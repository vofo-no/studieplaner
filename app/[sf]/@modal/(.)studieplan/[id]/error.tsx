"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "./modal";
import { useRouter } from "next/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Modal title="Å nei, noe gikk galt... 😵">
      <p>Vi klarer ikke å vise denne studieplanen.</p>
      <p>Kontakt studieforbundet hvis feilen fortsetter.</p>
      <div className="flex gap-4">
        <Button onClick={() => router.back()}>Gå tilbake</Button>
        <Button onClick={() => reset()} variant="secondary">
          Prøv igjen
        </Button>
      </div>
    </Modal>
  );
}
