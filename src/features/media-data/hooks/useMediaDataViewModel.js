import { startTransition, useDeferredValue, useMemo, useState } from "react";
import {
  mediaItems,
  mediaPrimaryNav,
  mediaQuickFilters,
  mediaSidebarNav,
  mediaSortOptions,
} from "../data/mediaDataMock";

const FALLBACK_PRIMARY_NAV = mediaPrimaryNav[0]?.id ?? "movies";
const FALLBACK_FILTER = mediaQuickFilters[0]?.id ?? "all";
const FALLBACK_SORT = mediaSortOptions[0]?.id ?? "featured";

function sortMediaItems(items, sortBy) {
  switch (sortBy) {
    case "rating":
      return items.toSorted((left, right) => (right.rating ?? 0) - (left.rating ?? 0));
    case "year":
      return items.toSorted((left, right) => (right.releaseYear ?? 0) - (left.releaseYear ?? 0));
    default:
      return items.toSorted((left, right) => {
        if (left.isNew === right.isNew) {
          return (right.rating ?? 0) - (left.rating ?? 0);
        }

        return Number(right.isNew) - Number(left.isNew);
      });
  }
}

function matchQuickFilter(item, quickFilter) {
  if (quickFilter === "4k") return item.qualityBadge?.toLowerCase().includes("4k");
  if (quickFilter === "new") return item.isNew;
  if (quickFilter === "classic") return item.category === "classic" || item.genres.includes("Classic");
  return true;
}

function useMediaDataViewModel() {
  const [activePrimaryNav, setActivePrimaryNav] = useState(FALLBACK_PRIMARY_NAV);
  const [activeSidebarNav, setActiveSidebarNav] = useState("media-data");
  const [activeQuickFilter, setActiveQuickFilter] = useState(FALLBACK_FILTER);
  const [sortBy, setSortBy] = useState(FALLBACK_SORT);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    const visibleItems = mediaItems.filter((item) => {
      const matchesPrimary = activePrimaryNav === "arrivals" ? item.isNew : item.category === activePrimaryNav;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [item.title, item.subtitle, item.description, ...item.genres]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesPrimary && matchesQuery && matchQuickFilter(item, activeQuickFilter);
    });

    return sortMediaItems(visibleItems, sortBy);
  }, [activePrimaryNav, activeQuickFilter, normalizedQuery, sortBy]);

  const activePrimaryItem = mediaPrimaryNav.find((item) => item.id === activePrimaryNav) ?? mediaPrimaryNav[0];
  const activeSortItem = mediaSortOptions.find((item) => item.id === sortBy) ?? mediaSortOptions[0];
  const hasNoResults = filteredItems.length === 0;
  const feedbackMessage = hasNoResults
    ? normalizedQuery.length > 0
      ? `没有匹配 “${deferredQuery}” 的资源条目`
      : "当前筛选组合下暂无可展示资源"
    : `${filteredItems.length} 个条目 · ${activePrimaryItem?.tone ?? "资源总览"}`;

  return {
    query,
    setQuery: (nextQuery) => startTransition(() => setQuery(nextQuery)),
    sortBy,
    setSortBy,
    activePrimaryNav,
    setActivePrimaryNav,
    activeSidebarNav,
    setActiveSidebarNav,
    activeQuickFilter,
    setActiveQuickFilter,
    primaryNav: mediaPrimaryNav,
    sidebarNav: mediaSidebarNav,
    quickFilters: mediaQuickFilters,
    sortOptions: mediaSortOptions,
    filteredItems,
    activePrimaryItem,
    activeSortItem,
    hasNoResults,
    isEmpty: mediaItems.length === 0,
    feedbackMessage,
  };
}

export default useMediaDataViewModel;
