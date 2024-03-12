import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useRefinementList } from "react-instantsearch";

export function Categories() {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList({
      attribute: "kategorier",
      limit: 999,
      sortBy: ["name"],
    });

  return (
    <>
      <h2 className="text-sm uppercase font-semibold">Emner</h2>
      <ul>
        {items.map((item) => (
          <li key={item.label} className="flex items-center space-x-2">
            <Checkbox
              checked={item.isRefined}
              onCheckedChange={() => refine(item.value)}
              id={item.value}
            />
            <label htmlFor={item.value} className="flex-grow">
              {item.label} ({item.count})
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
