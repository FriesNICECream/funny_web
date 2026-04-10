import Card from "../../../components/ui/Card";
import MediaLinkList from "./MediaLinkList";

function MediaCard({ item }) {
  const showPlaceholder = !item.coverImage;

  return (
    <Card className="media-card group flex h-full flex-col overflow-hidden rounded-[30px] border-white/8 bg-[var(--media-card-bg)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        {showPlaceholder ? (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(124,167,255,0.28),transparent_32%),linear-gradient(135deg,rgba(14,22,37,0.96),rgba(10,16,28,0.96))]">
            <div className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--media-muted)]">
              No Cover
            </div>
          </div>
        ) : (
          <img
            src={item.coverImage}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.04),rgba(4,8,16,0.14)_45%,rgba(4,8,16,0.74)_100%)]" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[var(--media-accent-border)] bg-[var(--media-accent-soft)] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--media-accent)]">
            {item.qualityBadge}
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/88">
            {item.releaseYear ?? "TBD"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="m-0 line-clamp-2 text-xl font-semibold tracking-[-0.05em] text-[var(--media-title)]">{item.title}</h3>
            <p className="mt-2 mb-0 line-clamp-2 text-sm text-[var(--media-body)]">{item.subtitle || item.description || "暂无补充说明"}</p>
          </div>

          <div className="shrink-0 rounded-2xl border border-[var(--media-accent-border)] bg-[var(--media-accent-soft)] px-3 py-2 text-right">
            <p className="m-0 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[var(--media-muted)]">Rating</p>
            <p className="m-0 text-base font-semibold text-[var(--media-title)]">{item.rating ?? "--"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-white/8 bg-black/12 px-2.5 py-1 text-[0.72rem] font-medium text-[var(--media-body)]"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="m-0 line-clamp-2 text-sm leading-6 text-[var(--media-body)]">{item.description || "当前条目用于占位验证，后续可替换为真实资源说明。"}</p>

        <div className="mt-auto">
          <MediaLinkList links={item.links} />
        </div>
      </div>
    </Card>
  );
}

export default MediaCard;
