import MediaDataShell from "./components/MediaDataShell";
import MediaFeedbackState from "./components/MediaFeedbackState";
import MediaGrid from "./components/MediaGrid";
import MediaToolbar from "./components/MediaToolbar";
import MediaTopNav from "./components/MediaTopNav";
import { mediaLibraryStats } from "./data/mediaDataMock";
import useMediaDataViewModel from "./hooks/useMediaDataViewModel";

function MediaDataPage() {
  const {
    query,
    setQuery,
    sortBy,
    setSortBy,
    activePrimaryNav,
    setActivePrimaryNav,
    activeQuickFilter,
    setActiveQuickFilter,
    primaryNav,
    quickFilters,
    sortOptions,
    filteredItems,
    activePrimaryItem,
    activeSortItem,
    feedbackMessage,
    hasNoResults,
    isEmpty,
  } = useMediaDataViewModel();

  const handleReset = () => {
    setQuery("");
    setActiveQuickFilter("all");
    setSortBy("featured");
    setActivePrimaryNav(primaryNav[0]?.id ?? "movies");
  };

  const summary = (
    <section className="media-hero rounded-[36px] px-5 py-6 md:px-8 md:py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
        <div className="max-w-3xl">
          <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--media-muted)]">Media Data</p>
          <h1 className="mt-4 mb-0 text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[var(--media-title)]">
            影视数据聚合
          </h1>
          <p className="mt-4 mb-0 max-w-2xl text-sm leading-7 text-[var(--media-body)] md:text-base">
            基于 Stitch 结构重组的片库工作台，当前使用前端 MOCK 数据驱动资源浏览、链接访问与筛选反馈。
          </p>
        </div>

        <div className="media-summary-panel rounded-[28px] p-5">
          <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--media-muted)]">当前视图</p>
          <p className="mt-3 mb-0 text-2xl font-semibold tracking-[-0.05em] text-[var(--media-title)]">{activePrimaryItem?.label}</p>
          <p className="mt-3 mb-0 text-sm leading-7 text-[var(--media-body)]">{feedbackMessage}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/6 px-3 py-2 text-xs font-medium text-[var(--media-title)]">
              排序：{activeSortItem?.label}
            </span>
            <span className="rounded-full bg-white/6 px-3 py-2 text-xs font-medium text-[var(--media-title)]">
              搜索：{query.trim() || "未输入"}
            </span>
          </div>
          <div className="mt-6 grid gap-3 border-t border-white/8 pt-4">
            {mediaLibraryStats.map((stat) => (
              <div key={stat.id} className="flex items-end justify-between gap-3">
                <span className="text-sm text-[var(--media-body)]">{stat.label}</span>
                <span className="text-lg font-semibold tracking-[-0.04em] text-[var(--media-title)]">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <MediaTopNav items={primaryNav} activeId={activePrimaryNav} onSelect={setActivePrimaryNav} />
      </div>
    </section>
  );

  return (
    <div className="grid gap-5">
      <MediaDataShell summary={summary}>
        <MediaToolbar
          query={query}
          onQueryChange={setQuery}
          quickFilters={quickFilters}
          activeQuickFilter={activeQuickFilter}
          onQuickFilterChange={setActiveQuickFilter}
          sortOptions={sortOptions}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {isEmpty ? (
          <MediaFeedbackState
            title="片库仍是空白"
            description="当前没有可展示的资源条目，请先补充 MOCK 数据或切换到其他视图。"
          />
        ) : hasNoResults ? (
          <MediaFeedbackState
            title="没有找到匹配资源"
            description="你可以清空搜索词或切换筛选条件，恢复完整片库视图。"
            actionLabel="重置筛选"
            onAction={handleReset}
          />
        ) : (
          <MediaGrid items={filteredItems} />
        )}
      </MediaDataShell>
    </div>
  );
}

export default MediaDataPage;
