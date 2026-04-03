import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SidebarContext = createContext(null);

function SidebarProvider({ children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setOpenMobile(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      state: open ? "expanded" : "collapsed",
      toggleSidebar: () => {
        if (isMobile) {
          setOpenMobile((current) => !current);
          return;
        }

        setOpen((current) => !current);
      },
    }),
    [isMobile, open, openMobile],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Sidebar 组件必须包裹在 SidebarProvider 中使用");
  }

  return context;
}

function Sidebar({
  children,
  className = "",
  collapsible = "icon",
  variant = "inset",
}) {
  const { isMobile, open, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = collapsible === "icon" && !open && !isMobile;
  const desktopWidth = isCollapsed ? "w-[88px]" : "w-[296px]";
  const variantClassName =
    variant === "inset"
      ? "rounded-[28px] border border-white/10 bg-[rgba(12,18,32,0.78)] shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl"
      : "border-r border-white/10 bg-[rgba(12,18,32,0.9)]";

  return (
    <>
      {isMobile && openMobile ? (
        <button
          type="button"
          aria-label="关闭侧边栏遮罩"
          className="fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-[2px]"
          onClick={() => setOpenMobile(false)}
        />
      ) : null}

      <aside
        className={[
          "relative z-40 flex h-full shrink-0 flex-col overflow-hidden text-white transition-all duration-300 ease-out",
          variantClassName,
          className,
          isMobile
            ? `fixed inset-y-3 left-3 ${openMobile ? "translate-x-0" : "-translate-x-[110%]"} w-[min(88vw,320px)]`
            : desktopWidth,
        ]
          .filter(Boolean)
          .join(" ")}
        data-state={isCollapsed ? "collapsed" : "expanded"}
      >
        {children}
      </aside>
    </>
  );
}

function SidebarInset({ children, className = "" }) {
  return <div className={`min-w-0 flex-1 ${className}`.trim()}>{children}</div>;
}

function SidebarHeader({ children, className = "" }) {
  return <div className={`border-b border-white/10 px-4 py-4 ${className}`.trim()}>{children}</div>;
}

function SidebarContent({ children, className = "" }) {
  return <div className={`flex-1 overflow-y-auto px-3 py-4 ${className}`.trim()}>{children}</div>;
}

function SidebarFooter({ children, className = "" }) {
  return <div className={`border-t border-white/10 px-3 py-3 ${className}`.trim()}>{children}</div>;
}

function SidebarGroup({ children, className = "" }) {
  return <section className={`mb-5 ${className}`.trim()}>{children}</section>;
}

function SidebarGroupLabel({ children, className = "" }) {
  return (
    <div className={`mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/42 ${className}`.trim()}>
      {children}
    </div>
  );
}

function SidebarGroupContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function SidebarMenu({ children, className = "" }) {
  return <div className={`grid gap-1 ${className}`.trim()}>{children}</div>;
}

function SidebarMenuItem({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function SidebarMenuButton({ children, className = "", isActive = false, onClick, title, type = "button" }) {
  const { open, isMobile } = useSidebar();
  const isCollapsed = !open && !isMobile;

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-white text-slate-950 shadow-[0_12px_24px_rgba(255,255,255,0.12)]"
          : "text-white/74 hover:bg-white/8 hover:text-white",
        isCollapsed ? "justify-center px-2" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}

function SidebarTrigger({ className = "", ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      aria-label="切换侧边栏"
      onClick={toggleSidebar}
      className={[
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white/86 backdrop-blur-sm transition hover:bg-white/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="flex w-5 flex-col gap-1.5">
        <span className="h-0.5 rounded-full bg-current" />
        <span className="h-0.5 rounded-full bg-current" />
        <span className="h-0.5 rounded-full bg-current" />
      </span>
    </button>
  );
}

export {
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
};
