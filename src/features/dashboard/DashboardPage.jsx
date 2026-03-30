import BlurText from "../../components/BlurText";
import Prism from "../../components/Prism";
import Button from "../../components/ui/Button";
import ThemeToggle from "../../components/ThemeToggle";

function DashboardPage({ session, themeMode, resolvedTheme, setThemeMode, onLogout }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070311] text-white">
      <div className="absolute inset-0">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,138,0.12),transparent_24%),linear-gradient(180deg,rgba(6,2,18,0.12),rgba(6,2,18,0.38))]" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-6 md:px-8 md:py-8">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/6 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl md:px-7">
          <div className="flex items-center gap-3 text-xl font-semibold tracking-[-0.03em]">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-white/14 bg-white/8 text-sm">
              FW
            </div>
            <span>Funny Web</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/86 md:flex">
            <a href="/" className="transition-opacity hover:opacity-100 opacity-100">
              主页
            </a>
            <button type="button" onClick={onLogout} className="cursor-pointer transition-opacity hover:opacity-100 opacity-86">
              登出
            </button>
          </nav>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-semibold text-white/88 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
            Mock Session · {session?.email}
          </div>

          <h1 className="mt-8 max-w-4xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-white">
            <BlurText text="尽 请 期 待" />
            <br />
            Look forward to it
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
            当前登录账号为
            {" "}
            {session?.email}。
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              type="button"
              className="min-w-36 bg-white px-8 text-[#10131f] shadow-[0_18px_40px_rgba(255,255,255,0.18)] hover:bg-white/92"
            >
              Waiting ...
            </Button>
            <Button
              type="button"
              onClick={onLogout}
              className="min-w-36 border border-white/12 bg-white/6 px-8 text-white/88 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm hover:bg-white/10"
            >
              登出
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
