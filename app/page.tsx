import { Button } from "@/components/ui/button";
import { tenants } from "@/lib/tenants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-4 p-24">
      <h1 className="text-4xl font-semibold">Velg studieforbund:</h1>
      {tenants.map((tenant) => (
        <Button asChild key={tenant.key}>
          <Link href={tenant.key}>{tenant.name}</Link>
        </Button>
      ))}
    </main>
  );
}
