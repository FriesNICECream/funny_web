import BrandPanel from "./components/BrandPanel";
import LoginPanel from "./components/LoginPanel";

function AuthPage({ themeMode, resolvedTheme, setThemeMode, onLoginSuccess, isSubmitting, year }) {
  return (
    <main className="min-h-screen px-4 py-5 md:px-8 md:py-8">
      <section className="mx-auto grid min-h-[720px] w-full max-w-[1180px] overflow-hidden rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] shadow-[var(--shell-shadow)] backdrop-blur-[22px] transition-colors duration-300 lg:grid-cols-[1.05fr_0.95fr]">
        <BrandPanel />
        <LoginPanel
          themeMode={themeMode}
          resolvedTheme={resolvedTheme}
          setThemeMode={setThemeMode}
          onLoginSuccess={onLoginSuccess}
          isSubmitting={isSubmitting}
        />
      </section>

      <footer className="mx-auto mt-[18px] w-full max-w-[1180px] text-left text-[0.9rem] text-[var(--footer-text)] transition-colors duration-300">
        © {year} Funny Web. All rights reserved.
      </footer>
    </main>
  );
}

export default AuthPage;
