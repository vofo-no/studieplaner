"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  Configure,
  InstantSearch,
  PoweredBy,
  Stats,
} from "react-instantsearch";
import { CustomSearchBox } from "./custom-search-box";
import { Pagination } from "./pagination";
import { Categories } from "./categories";
import { history } from "instantsearch.js/es/lib/routers";
import { useParams } from "next/navigation";
import { Hits } from "./hits";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

export function Search() {
  const indexName = "studieplaner";
  const params = useParams();

  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      routing={{
        stateMapping: {
          stateToRoute(uiState: any) {
            const indexUiState = uiState[indexName];

            return {
              q: indexUiState.query,
              emner: indexUiState.refinementList?.kategorier,
              side: indexUiState.page,
            };
          },
          routeToState: (routeState: any) => {
            return {
              [indexName]: {
                query: routeState.q,
                refinementList: routeState.emner
                  ? { kategorier: routeState.emner }
                  : undefined,
                page: routeState.side,
              },
            };
          },
        },
        router: history<{ q?: string; emner?: string[]; side?: number }>({
          cleanUrlOnDispose: false,
          windowTitle(routeState) {
            return [routeState.q, "Studieplaner"].filter(Boolean).join(" – ");
          },
        }),
      }}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure filters={`sf:${params["sf"]}`} />
      <div className="my-6">
        <CustomSearchBox />
        <div className="w-28 float-end my-2">
          <PoweredBy />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-5">
          <div className="max-w-prose">
            <div className="text-xs mb-4">
              <Stats
                translations={{
                  rootElementText({ nbHits }) {
                    return nbHits
                      ? `${nbHits.toLocaleString()} resultater`
                      : "Ingen resultater";
                  },
                }}
              />
            </div>
            <Hits />
            <div className="hidden sm:block">
              <Pagination />
            </div>
            <div className="sm:hidden">
              <Pagination mobile />
            </div>
          </div>
        </div>
        <div className="flex-shrink sticky top-0 md:col-span-2">
          <Categories />
        </div>
      </div>
    </InstantSearch>
  );
}
