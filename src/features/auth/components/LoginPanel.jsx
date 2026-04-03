import { useState } from "react";
import ThemeToggle from "../../../components/ThemeToggle";
import Card from "../../../components/ui/Card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginPanel({ themeMode, resolvedTheme, setThemeMode, onLoginSuccess, isSubmitting }) {
  const [mode, setMode] = useState("login");
  const [noticeMessage, setNoticeMessage] = useState("");

  const switchToLogin = (message = "") => {
    setMode("login");
    setNoticeMessage(message);
  };

  const switchToRegister = () => {
    setMode("register");
    setNoticeMessage("");
  };

  const isLoginMode = mode === "login";

  return (
    <section className="flex items-center justify-center bg-[var(--panel-bg)] p-5 transition-colors duration-300 md:p-7">
      <Card className="w-full max-w-[470px] p-6 md:p-[34px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2.5 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--card-muted)]">
              {isLoginMode ? "Welcome back" : "Create account"}
            </p>
            <h2 className="m-0 text-[2rem] tracking-[-0.04em]">{isLoginMode ? "登录账号" : "注册账号"}</h2>
          </div>

          <ThemeToggle themeMode={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode} />
        </div>

        <div className="mt-7 inline-flex rounded-2xl border border-[var(--toggle-border)] bg-[var(--toggle-bg)] p-1 shadow-[var(--toggle-shadow)]">
          <button
            type="button"
            onClick={() => switchToLogin()}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              isLoginMode ? "bg-[var(--toggle-active-bg)] text-[var(--toggle-active-text)]" : "text-[var(--toggle-text)]"
            }`}
          >
            登录
          </button>
          <button
            type="button"
            onClick={switchToRegister}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              isLoginMode ? "text-[var(--toggle-text)]" : "bg-[var(--toggle-active-bg)] text-[var(--toggle-active-text)]"
            }`}
          >
            注册
          </button>
        </div>

        {isLoginMode ? (
          <LoginForm onLoginSuccess={onLoginSuccess} isSubmitting={isSubmitting} noticeMessage={noticeMessage} />
        ) : (
          <RegisterForm onSwitchToLogin={switchToLogin} />
        )}

        <p className="mt-6 text-center text-[var(--card-muted)]">
          {isLoginMode ? "还没有账号？" : "已经有账号？"}{" "}
          <button
            type="button"
            onClick={isLoginMode ? switchToRegister : () => switchToLogin()}
            className="cursor-pointer border-none bg-transparent p-0 text-[var(--link-color)]"
          >
            {isLoginMode ? "立即注册" : "返回登录"}
          </button>
        </p>
      </Card>
    </section>
  );
}

export default LoginPanel;
