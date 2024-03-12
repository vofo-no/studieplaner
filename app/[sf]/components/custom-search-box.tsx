"use client";
import { Input } from "@/components/ui/input";
import { useSearchBox } from "react-instantsearch";

export function CustomSearchBox() {
  const { query, refine } = useSearchBox();

  return (
    <Input
      size="lg"
      type="search"
      placeholder="Søk etter studieplan"
      value={query}
      className="shadow"
      onChange={(e) => refine(e.currentTarget.value)}
    />
  );
}
