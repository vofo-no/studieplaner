"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchBox } from "react-instantsearch";

export function CustomSearchBox() {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <Input
      size="lg"
      type="search"
      placeholder="Søk etter studieplan"
      value={inputValue}
      className="shadow"
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
  );
}
