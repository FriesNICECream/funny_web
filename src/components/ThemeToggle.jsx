const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M12 3V5M12 19V21M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M3 12H5M19 12H21M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93M16 12A4 4 0 1 1 8 12A4 4 0 0 1 16 12Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M4 6.8C4 5.81 4.81 5 5.8 5H18.2C19.19 5 20 5.81 20 6.8V14.2C20 15.19 19.19 16 18.2 16H13L14.5 19H9.5L11 16H5.8C4.81 16 4 15.19 4 14.2V6.8Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
];

function ThemeToggle({ themeMode, resolvedTheme, onChange }) {
  const modeLabel = themeMode.charAt(0).toUpperCase() + themeMode.slice(1);

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="inline-flex rounded-2xl border border-[var(--toggle-border)] bg-[var(--toggle-bg)] p-1 shadow-[var(--toggle-shadow)] backdrop-blur-sm">
        {THEME_OPTIONS.map((option) => {
          const active = option.value === themeMode;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "bg-[var(--toggle-active-bg)] text-[var(--toggle-active-text)]"
                  : "text-[var(--toggle-text)] hover:text-[var(--card-text)]"
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      <p className="m-0 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--card-muted)]">
        {modeLabel} · {resolvedTheme}
      </p>
    </div>
  );
}

export default ThemeToggle;
