import Input from "../../../components/ui/Input";

function MediaToolbar({
  query,
  onQueryChange,
  quickFilters,
  activeQuickFilter,
  onQuickFilterChange,
  sortOptions,
  sortBy,
  onSortChange,
}) {
  return (
    <section className="media-panel flex flex-col gap-4 rounded-[28px] px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="media-orb h-11 w-11 rounded-2xl" />
          <div>
            <p className="m-0 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--media-muted)]">检索中枢</p>
            <h2 className="m-0 text-lg font-semibold tracking-[-0.05em] text-[var(--media-title)]">筛选、搜索与排序</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((item) => {
            const active = item.id === activeQuickFilter;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onQuickFilterChange(item.id)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-[var(--media-accent-soft)] text-[var(--media-accent)]"
                    : "bg-white/4 text-[var(--media-body)] hover:bg-white/8 hover:text-[var(--media-title)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 lg:w-[360px]">
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="搜索片名、标签或描述"
          className="border-white/10 bg-white/4 text-white placeholder:text-[var(--media-muted)]"
        />
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => {
            const active = option.id === sortBy;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSortChange(option.id)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-[var(--media-accent-border)] bg-[var(--media-accent-soft)] text-[var(--media-accent)]"
                    : "border-white/10 bg-transparent text-[var(--media-body)] hover:border-white/20 hover:text-[var(--media-title)]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MediaToolbar;
