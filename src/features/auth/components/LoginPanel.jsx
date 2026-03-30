import ThemeToggle from "../../../components/ThemeToggle";
import Card from "../../../components/ui/Card";
import LoginForm from "./LoginForm";

function LoginPanel({ themeMode, resolvedTheme, setThemeMode, onLoginSuccess }) {
  return (
    <section className="flex items-center justify-center bg-[var(--panel-bg)] p-5 transition-colors duration-300 md:p-7">
      <Card className="w-full max-w-[470px] p-6 md:p-[34px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2.5 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--card-muted)]">
              Welcome back
            </p>
            <h2 className="m-0 text-[2rem] tracking-[-0.04em]">登录账号</h2>
          </div>

          <ThemeToggle themeMode={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode} />
        </div>

        <LoginForm onLoginSuccess={onLoginSuccess} />

        <p className="mt-6 text-center text-[var(--card-muted)]">
          还没有账号？{" "}
          <a href="/" className="text-[var(--link-color)] no-underline">
            创建团队空间
          </a>
        </p>
      </Card>
    </section>
  );
}

export default LoginPanel;
