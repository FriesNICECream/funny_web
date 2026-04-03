import { useState } from "react";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import { registerWithPassword } from "../authApi";

function RegisterForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();
    const normalizedFullName = fullName.trim();

    if (!normalizedEmail || !normalizedFullName || !password || !confirmPassword) {
      setError("请完整填写邮箱、用户名和密码。");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      setError("密码长度需要在 8 到 128 位之间。");
      return;
    }

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致。");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithPassword({
        email: normalizedEmail,
        fullName: normalizedFullName,
        password,
      });
      onSwitchToLogin("注册成功，请使用新账号登录。");
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "注册失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
      <TextField
        label="用户名"
        type="text"
        placeholder="请输入显示名称"
        autoComplete="name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />

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
        placeholder="请输入 8 位以上密码"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <TextField
        label="确认密码"
        type="password"
        placeholder="请再次输入密码"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      {error ? (
        <p className="m-0 rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-text)]">
          {error}
        </p>
      ) : ( null
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundImage: "var(--primary-bg)" }}
        className="mt-1.5 w-full text-[var(--primary-text)] shadow-[var(--primary-shadow)]"
      >
        {isSubmitting ? "注册中..." : "创建账号"}
      </Button>
    </form>
  );
}

export default RegisterForm;
