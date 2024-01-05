"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import { useState } from "react";
import {
  Highlight,
  Hits,
  InstantSearch,
  Menu,
  PoweredBy,
  RefinementList,
  Snippet,
  useSearchBox,
} from "react-instantsearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

function Hit({ hit }: { hit: any }) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg">
        <Link href={`/skt/${hit.nr}`} className="hover:underline">
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
  );
}

function CustomSearchBox() {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <Input
      type="search"
      placeholder="Søk etter studieplan"
      value={inputValue}
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
  );
}

export function Search() {
  return (
    <InstantSearch
      indexName="studieplaner"
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <div className="my-6">
        <CustomSearchBox />
        <div className="w-28 float-end my-2">
          <PoweredBy />
        </div>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row-reverse">
        <div className="lg:w-1/4">
          <h2 className="text-sm uppercase font-semibold">Kategorier</h2>
          <RefinementList
            attribute="kategorier"
            title="Kategorier"
            showMore
            translations={{
              showMoreButtonText({ isShowingMore }) {
                return isShowingMore ? "Vis færre" : "Vis flere";
              },
            }}
          />
        </div>
        <Hits hitComponent={Hit} />
      </div>

      {/* other widgets */}
    </InstantSearch>
  );
}
