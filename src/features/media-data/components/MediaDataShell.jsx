function MediaDataShell({ children, summary }) {
  return (
    <div className="grid gap-5">
      {summary}
      {children}
    </div>
  );
}

export default MediaDataShell;
