"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalProps extends PropsWithChildren {
  title: string;
}

export function Modal({ children, title }: ModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prevTitle, setPrevTitle] = useState("");

  useEffect(() => {
    setOpen(true);
    if (document) {
      setPrevTitle(document.title);
      document.title = title;
    }
  }, [title]);

  function handleOpenChange(open: boolean) {
    if (!open) {
      router.back();
      document.title = prevTitle;
    }

    setOpen(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-screen-lg max-h-screen sm:max-h-[95vh] sm:w-[95vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold text-4xl">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
