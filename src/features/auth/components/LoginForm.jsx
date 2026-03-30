import { useState } from "react";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import {
  authenticateMockUser,
  MOCK_USER,
} from "../mockAuth";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // 这里使用固定 mock 账号，便于前端阶段联调与演示。
    if (!authenticateMockUser(email.trim(), password)) {
      setError("账号或密码错误，请使用 admin@gmail.com / admin 登录。");
      return;
    }

    onLoginSuccess({ remember });
    setPassword("");
  };

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
      <TextField
        label="邮箱地址"
        type="email"
        placeholder="admin@gmail.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        label="密码"
        type="password"
        placeholder="请输入 admin"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className="flex items-center justify-between gap-4 text-[0.92rem] text-[var(--card-muted)]">
        <label className="inline-flex items-center gap-2.5 font-medium">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4"
          />
          <span>保持登录状态</span>
        </label>
        <a href="/" className="text-[var(--link-color)] no-underline">
          忘记密码？
        </a>
      </div>

      {error ? (
        <p className="m-0 rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-text)]">
          {error}
        </p>
      ) : (
        <p className="m-0 rounded-2xl border border-[var(--hint-border)] bg-[var(--hint-bg)] px-4 py-3 text-sm text-[var(--card-muted)]">
          Mock 账号：admin@gmail.com / admin
        </p>
      )}

      <Button
        type="submit"
        style={{ backgroundImage: "var(--primary-bg)" }}
        className="mt-1.5 w-full text-[var(--primary-text)] shadow-[var(--primary-shadow)]"
      >
        进入控制台
      </Button>
    </form>
  );
}

export default LoginForm;
