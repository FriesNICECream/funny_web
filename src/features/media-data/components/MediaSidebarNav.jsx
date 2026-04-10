function MediaSidebarNav({ items, activeId, onSelect }) {
  return (
    <div className="grid gap-1">
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center justify-between gap-4 rounded-2xl px-3 py-3 text-left transition ${
              active ? "bg-white text-slate-950" : "bg-transparent text-white/70 hover:bg-white/6 hover:text-white"
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{item.label}</span>
              <span className={`block truncate text-xs ${active ? "text-slate-600" : "text-white/42"}`}>{item.detail}</span>
            </span>
            <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${active ? "text-slate-500" : "text-white/32"}`}>
              {active ? "On" : "Go"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MediaSidebarNav;
