import { Suspense, lazy, useState } from "react";
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
import MediaDataPage from "../media-data/MediaDataPage";
import { mediaSidebarNav } from "../media-data/data/mediaDataMock";

const FluidGlass = lazy(() => import("../../components/FluidGlass"));

function DashboardPage({ session, themeMode, resolvedTheme, setThemeMode, onLogout }) {
  const user = session?.user;
  const [activeView, setActiveView] = useState("media-data");

  return (
    <SidebarProvider defaultOpen>
      <DashboardShell
        user={user}
        activeView={activeView}
        onChangeView={setActiveView}
        themeMode={themeMode}
        resolvedTheme={resolvedTheme}
        setThemeMode={setThemeMode}
        onLogout={onLogout}
      />
    </SidebarProvider>
  );
}

function DashboardShell({ user, activeView, onChangeView, themeMode, resolvedTheme, setThemeMode, onLogout }) {
  const activeNavItem = mediaSidebarNav.find((item) => item.id === activeView) ?? mediaSidebarNav[1];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,175,76,0.18),transparent_24%),radial-gradient(circle_at_right,rgba(82,146,255,0.16),transparent_26%),linear-gradient(180deg,#07111f_0%,#091426_48%,#0d1730_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_24%,transparent_72%,rgba(255,255,255,0.02))]" />

      <div className="relative z-10 flex min-h-screen gap-3 p-3 md:gap-5 md:p-5">
        <AppSidebar user={user} activeView={activeView} onChangeView={onChangeView} onLogout={onLogout} />

        <SidebarInset className="flex min-h-[calc(100vh-1.5rem)] flex-col rounded-[30px] border border-white/10 bg-[rgba(7,12,24,0.58)] shadow-[0_24px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl md:min-h-[calc(100vh-2.5rem)]">
          <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/42">Media Dashboard</p>
                <h1 className="m-0 text-xl font-semibold tracking-[-0.04em] md:text-2xl">{activeNavItem.label}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle themeMode={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode} />
              <div className="hidden rounded-2xl border border-white/10 bg-white/6 px-4 py-2 text-right md:block">
                <p className="m-0 text-sm font-medium text-white/92">{user?.full_name || "未命名用户"}</p>
                <p className="m-0 text-xs text-white/54">{user?.email}</p>
                <p className="mt-2 mb-0 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/36">
                  {resolvedTheme === "dark" ? "深色模式" : "浅色模式"}
                </p>
              </div>
            </div>
          </header>

          <section className="flex-1 overflow-hidden p-4 md:p-6">
            <div className="relative h-full min-h-[560px] overflow-y-auto rounded-[32px] border border-white/10 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.26)] md:min-h-[680px] md:p-4">
              <DashboardContent activeView={activeView} />
            </div>
          </section>
        </SidebarInset>
      </div>
    </main>
  );
}

function AppSidebar({ user, activeView, onChangeView, onLogout }) {
  const { open, isMobile, setOpenMobile } = useSidebar();
  const collapsed = !open && !isMobile;

  const handleSelect = (nextView) => {
    onChangeView(nextView);

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
              <h2 className="m-0 truncate text-lg font-semibold tracking-[-0.04em]">Media Data</h2>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导航</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mediaSidebarNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={item.id === activeView} title={item.label} onClick={() => handleSelect(item.id)}>
                    <NavGlyph label={item.label} active={item.id === activeView} />
                    {collapsed ? null : (
                      <span className="min-w-0">
                        <span className="block truncate">{item.label}</span>
                        <span className={`block truncate text-xs ${item.id === activeView ? "text-slate-600" : "text-white/45"}`}>
                          {item.detail}
                        </span>
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

function DashboardContent({ activeView }) {
  if (activeView === "media-data") {
    return <MediaDataPage />;
  }

  if (activeView === "landing") {
    return (
      <div className="relative h-full min-h-[520px] overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top_left,#16325b_0%,#0d1730_34%,#08101d_100%)]">
        <div className="h-full min-h-[520px] [&>div]:h-full [&_canvas]:h-full [&_canvas]:w-full">
          <Suspense fallback={<FluidGlassFallback />}>
            <FluidGlass />
          </Suspense>
        </div>
      </div>
    );
  }

  const currentItem = mediaSidebarNav.find((item) => item.id === activeView);

  return (
    <section className="media-hero flex min-h-[520px] flex-col justify-between rounded-[36px] px-6 py-8 md:px-8 md:py-10">
      <div className="max-w-3xl">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--media-muted)]">Workspace</p>
        <h2 className="mt-4 mb-0 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-[var(--media-title)]">
          {currentItem?.label ?? "内容区域"}
        </h2>
        <p className="mt-4 mb-0 max-w-2xl text-sm leading-7 text-[var(--media-body)] md:text-base">
          当前导航已切换到 {currentItem?.label ?? "目标模块"}。这个区域暂时保留为占位视图，后续可以继续按同一 Spec Kit 流程补齐独立页面实现。
        </p>
      </div>

      <div className="media-summary-panel max-w-xl rounded-[28px] p-5">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--media-muted)]">当前状态</p>
        <p className="mt-3 mb-0 text-lg font-semibold tracking-[-0.05em] text-[var(--media-title)]">导航点击已生效</p>
        <p className="mt-3 mb-0 text-sm leading-7 text-[var(--media-body)]">
          左侧导航现在会更新激活态、页头标题和主内容区。`影视数据` 仍然指向已完成的媒体数据仪表盘，其余项先显示可见占位内容。
        </p>
      </div>
    </section>
  );
}

function FluidGlassFallback() {
  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,#16325b_0%,#0d1730_34%,#08101d_100%)]">
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

function NavGlyph({ label, active = false }) {
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-sm font-semibold ${active ? "bg-slate-200 text-slate-950" : "bg-white/8"}`}>
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
