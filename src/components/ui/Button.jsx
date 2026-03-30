function Button({ className = "", style, type = "button", children, ...props }) {
  return (
    <button
      type={type}
      style={style}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
