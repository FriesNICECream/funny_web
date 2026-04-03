import { Suspense, lazy } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../../components/ui/Sidebar";

const FluidGlass = lazy(() => import("../../components/FluidGlass"));

function DashboardPage({ session, themeMode, resolvedTheme, setThemeMode, onLogout }) {
  const user = session?.user;

  return (
    <SidebarProvider defaultOpen>
      <DashboardShell
        user={user}
        themeMode={themeMode}
        resolvedTheme={resolvedTheme}
        setThemeMode={setThemeMode}
        onLogout={onLogout}
      />
    </SidebarProvider>
  );
}

function DashboardShell({ user, themeMode, resolvedTheme, setThemeMode, onLogout }) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,175,76,0.18),transparent_24%),radial-gradient(circle_at_right,rgba(82,146,255,0.16),transparent_26%),linear-gradient(180deg,#07111f_0%,#091426_48%,#0d1730_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_24%,transparent_72%,rgba(255,255,255,0.02))]" />

      <div className="relative z-10 flex min-h-screen gap-3 p-3 md:gap-5 md:p-5">
        <AppSidebar user={user} onLogout={onLogout} />

        <SidebarInset className="flex min-h-[calc(100vh-1.5rem)] flex-col rounded-[30px] border border-white/10 bg-[rgba(7,12,24,0.58)] shadow-[0_24px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl md:min-h-[calc(100vh-2.5rem)]">
          <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/42">Shadcn Sidebar</p>
                <h1 className="m-0 text-xl font-semibold tracking-[-0.04em] md:text-2xl">初始界面</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle themeMode={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode} />
              <div className="hidden rounded-2xl border border-white/10 bg-white/6 px-4 py-2 text-right md:block">
                <p className="m-0 text-sm font-medium text-white/92">{user?.full_name || "未命名用户"}</p>
                <p className="m-0 text-xs text-white/54">{user?.email}</p>
              </div>
            </div>
          </header>

          <section className="flex-1 overflow-hidden p-4 md:p-6">
            <div className="relative h-full min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.26)] md:min-h-[680px]">
              <Suspense fallback={<FluidGlassFallback />}>
                <FluidGlass />
              </Suspense>

              <div className="pointer-events-none absolute right-6 top-6 hidden rounded-2xl border border-white/10 bg-slate-950/26 px-4 py-3 text-right backdrop-blur-md md:block">
                <p className="m-0 text-sm font-medium text-white/92">{user?.full_name || "未命名用户"}</p>
                <p className="m-0 text-xs text-white/58">{user?.email}</p>
                <p className="mt-2 mb-0 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/36">
                  {resolvedTheme === "dark" ? "深色模式" : "浅色模式"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isMobile) {
                    setOpenMobile(true);
                  }
                }}
                className="absolute bottom-5 right-5 rounded-2xl border border-white/10 bg-slate-950/34 px-4 py-3 text-sm font-medium text-white/88 backdrop-blur-md transition hover:bg-slate-950/44 md:hidden"
              >
                打开左侧导航
              </button>
            </div>
          </section>
        </SidebarInset>
      </div>
    </main>
  );
}

function FluidGlassFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,#16325b_0%,#0d1730_34%,#08101d_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_24%,transparent_72%,rgba(255,255,255,0.02))]" />
      <div className="absolute left-6 top-6 max-w-[min(70vw,560px)] md:left-10 md:top-10">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#f3c56b]/88">初始界面</p>
        <h2 className="mt-4 mb-0 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-white">Funny Web</h2>
        <p className="mt-4 mb-0 max-w-xl text-sm leading-7 text-white/70 md:text-base">正在加载 Fluid Glass 场景...</p>
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-[18%] h-[42%] w-[30%] animate-pulse rounded-[32px] border border-white/8 bg-white/4" />
        <div className="absolute right-[14%] top-[22%] h-[24%] w-[22%] animate-pulse rounded-[32px] border border-white/8 bg-white/5" />
        <div className="absolute left-[18%] bottom-[12%] h-[24%] w-[12%] animate-pulse rounded-[28px] border border-white/8 bg-white/4" />
        <div className="absolute left-[35%] bottom-[14%] h-[18%] w-[14%] animate-pulse rounded-[28px] border border-white/8 bg-white/5" />
        <div className="absolute right-[16%] bottom-[13%] h-[20%] w-[18%] animate-pulse rounded-[28px] border border-white/8 bg-white/4" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-white/8 shadow-[0_0_90px_rgba(110,168,255,0.16)] backdrop-blur-xl" />
      </div>
    </div>
  );
}

function AppSidebar({ user, onLogout }) {
  const { open, isMobile, setOpenMobile } = useSidebar();
  const collapsed = !open && !isMobile;

  const handleSelect = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#f6b34b,#4f7dff)] text-base font-black text-slate-950">
            FW
          </div>
          {collapsed ? null : (
            <div className="min-w-0">
              <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/42">Funny Web</p>
              <h2 className="m-0 truncate text-lg font-semibold tracking-[-0.04em]">初始界面</h2>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{collapsed ? "导" : "导航"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive title="初始界面" onClick={handleSelect}>
                  <NavGlyph label="初始界面" />
                  {collapsed ? null : (
                    <span className="min-w-0">
                      <span className="block truncate">初始界面</span>
                      <span className="block truncate text-xs text-slate-600">Fluid Glass 首屏</span>
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton title={user?.full_name || "用户信息"}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                {(user?.full_name || user?.email || "U").slice(0, 1).toUpperCase()}
              </div>
              {collapsed ? null : (
                <span className="min-w-0">
                  <span className="block truncate">{user?.full_name || "未命名用户"}</span>
                  <span className="block truncate text-xs text-white/45">{user?.email}</span>
                </span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton title="登出" onClick={onLogout}>
              <LogoutGlyph />
              {collapsed ? null : <span>退出登录</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function NavGlyph({ label }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/8 text-sm font-semibold">
      {label.slice(0, 1)}
    </span>
  );
}
function LogoutGlyph() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/8 text-lg">
      ↗
    </span>
  );
}

export default DashboardPage;
