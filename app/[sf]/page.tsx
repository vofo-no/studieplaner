import { getTenant } from "@/lib/tenants";
import { Search } from "./components/search";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { sf: string };
}

export default async function StudieplanIndexPage({ params }: PageProps) {
  const tenant = getTenant(params.sf);

  if (!tenant) {
    return notFound();
  }

  return <Search />;
}
