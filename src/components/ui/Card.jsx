function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-[28px] border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--card-text)] shadow-[var(--card-shadow)] transition-colors duration-300 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default Card;
