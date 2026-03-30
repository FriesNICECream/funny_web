function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3.5 text-[var(--card-text)] outline-none transition placeholder:text-[var(--input-placeholder)] focus:border-[var(--input-focus)] focus:shadow-[var(--input-focus-ring)] ${className}`.trim()}
      {...props}
    />
  );
}

export default Input;
