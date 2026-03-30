import Input from "./Input";

function TextField({ label, className = "", ...props }) {
  return (
    <label className={`grid gap-2 text-[0.95rem] font-semibold ${className}`.trim()}>
      {label}
      <Input {...props} />
    </label>
  );
}

export default TextField;
