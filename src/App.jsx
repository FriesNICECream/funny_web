import AuthPage from "./features/auth/AuthPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import useAuthSession from "./hooks/useAuthSession";
import useTheme from "./hooks/useTheme";

function App() {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const { session, isAuthenticated, isSubmitting, login, logout } = useAuthSession();
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

  return (
    <AuthPage
      themeMode={themeMode}
      resolvedTheme={resolvedTheme}
      setThemeMode={setThemeMode}
      onLoginSuccess={login}
      isSubmitting={isSubmitting}
      year={year}
    />
  );
}

export default App;
