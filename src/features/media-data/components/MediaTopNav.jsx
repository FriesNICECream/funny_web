function MediaTopNav({ items, activeId, onSelect }) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-white text-slate-950 shadow-[0_10px_24px_rgba(255,255,255,0.14)]"
                : "bg-white/4 text-white/72 hover:bg-white/8 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export default MediaTopNav;
