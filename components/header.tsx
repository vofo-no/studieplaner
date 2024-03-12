"use client";

import { getTenant } from "@/lib/tenants";
import { VariantProps, cva } from "class-variance-authority";
import { useSelectedLayoutSegments } from "next/navigation";

const headerVariants = cva("shadow py-4 print:hidden", {
  variants: {
    tenant: {
      default: "bg-primary text-primary-foreground",
      skt: "bg-fuchsia-700 text-white",
    },
  },
  defaultVariants: {
    tenant: "default",
  },
});

export function Header() {
  const tenant = useSelectedLayoutSegments()[0] as VariantProps<
    typeof headerVariants
  >["tenant"];

  const tenantName = getTenant(tenant)?.name;

  return (
    <header className={headerVariants({ tenant })}>
      <div className="max-w-screen-lg mx-auto px-2 md:px-4">
        {tenantName && <div>{tenantName}</div>}
        <div className="text-2xl font-semibold">Studieplaner</div>
      </div>
    </header>
  );
}
