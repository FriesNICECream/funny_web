function MediaFeedbackState({ title, description, actionLabel, onAction }) {
  return (
    <section className="media-panel flex min-h-[260px] flex-col items-center justify-center rounded-[30px] px-6 py-12 text-center">
      <div className="media-orb mb-6 h-20 w-20 rounded-full" />
      <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--media-muted)]">Media State</p>
      <h3 className="mt-3 mb-0 text-2xl font-semibold tracking-[-0.05em] text-[var(--media-title)]">{title}</h3>
      <p className="mt-4 mb-0 max-w-md text-sm leading-7 text-[var(--media-body)]">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-[var(--media-title)] transition hover:-translate-y-0.5 hover:bg-white/10"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

export default MediaFeedbackState;
