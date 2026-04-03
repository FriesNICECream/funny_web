import { useState } from "react";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";

function LoginForm({ onLoginSuccess, isSubmitting, noticeMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError("请输入邮箱和密码。");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      setError("密码长度需要在 8 到 128 位之间。");
      return;
    }

    try {
      await onLoginSuccess({
        email: normalizedEmail,
        password,
        remember,
      });
      setPassword("");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "登录失败，请稍后重试");
    }
  };

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
      <TextField
        label="邮箱地址"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        label="密码"
        type="password"
        placeholder="请输入登录密码"
        autoComplete="current-password"
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
      ) : noticeMessage ? (
        <p className="m-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-300">
          {noticeMessage}
        </p>
      ) : (
        <p className="m-0 rounded-2xl border border-[var(--hint-border)] bg-[var(--hint-bg)] px-4 py-3 text-sm text-[var(--card-muted)]">
          可用账号示例：<br />
          <strong>邮箱：testUser@gmail.com</strong><br />
          <strong>密码：testUser</strong>

        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundImage: "var(--primary-bg)" }}
        className="mt-1.5 w-full text-[var(--primary-text)] shadow-[var(--primary-shadow)]"
      >
        {isSubmitting ? "登录中..." : "进入控制台"}
      </Button>
    </form>
  );
}

export default LoginForm;
