import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import { Highlight, Snippet, useHits } from "react-instantsearch";

export function Hits() {
  const { hits } = useHits<{
    sf: String;
    nr: string;
    tittel: string;
    innhold: string;
    kategorier?: string[];
  }>();

  return hits.map((hit) => (
    <div className="mb-6" key={hit.objectID}>
      <h2 className="font-semibold text-lg">
        <Link
          href={`/${hit.sf}/studieplan/${hit.nr}`}
          className="hover:underline"
        >
          <Highlight attribute="nr" hit={hit} />{" "}
          <Highlight attribute="tittel" hit={hit} />
        </Link>
      </h2>
      <div className="mb-1">
        {hit.kategorier?.map((item: string) => (
          <Badge variant="outline" key={item}>
            {item}
          </Badge>
        ))}
      </div>
      <p>
        <Snippet hit={hit} attribute="innhold" />
      </p>
    </div>
  ));
}
