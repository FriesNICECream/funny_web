import AuthPage from "./features/auth/AuthPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import useTheme from "./hooks/useTheme";
import useMockSession from "./hooks/useMockSession";

function App() {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const { session, isAuthenticated, login, logout } = useMockSession();
  const year = new Date().getFullYear();

  if (isAuthenticated) {
    return (
      <DashboardPage
        session={session}
        themeMode={themeMode}
        resolvedTheme={resolvedTheme}
        setThemeMode={setThemeMode}
        onLogout={logout}
      />
    );
  }

  return <AuthPage themeMode={themeMode} resolvedTheme={resolvedTheme} setThemeMode={setThemeMode} onLoginSuccess={login} year={year} />;
}

export default App;
