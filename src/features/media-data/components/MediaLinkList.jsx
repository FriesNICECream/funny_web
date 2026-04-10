function MediaLinkList({ links }) {
  return (
    <div className="grid gap-2.5">
      <p className="m-0 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--media-muted)]">资源链接</p>
      {links.map((link) => {
        const clickable = Boolean(link.href) && link.status === "available";

        return clickable ? (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-[var(--media-accent-border)] hover:bg-[var(--media-accent-soft)]"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-[var(--media-title)]">{link.label}</span>
              <span className="truncate text-xs text-[var(--media-body)]">{link.detail}</span>
            </div>
            <span className="rounded-full border border-[var(--media-accent-border)] px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--media-accent)]">
              打开
            </span>
          </a>
        ) : (
          <div
            key={link.id}
            className="flex items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-black/10 px-3 py-3 text-left"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-[var(--media-title)]">{link.label}</span>
              <span className="truncate text-xs text-[var(--media-body)]">{link.detail}</span>
            </div>
            <span className="rounded-full border border-white/10 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--media-muted)]">
              待补充
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MediaLinkList;
