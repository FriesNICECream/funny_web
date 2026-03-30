import Shuffle from "../../../components/Shuffle";

function BrandPanel() {
  return (
    <aside className="relative flex flex-col justify-center gap-6 bg-[var(--showcase-bg)] p-6 transition-colors duration-300 md:p-14">
      <div className="flex items-start gap-4 md:gap-[18px]">
        <div className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-[linear-gradient(135deg,#ffca72,#ff8757)] text-sm font-extrabold tracking-[0.08em] text-[#08111e] shadow-[0_18px_48px_rgba(255,146,83,0.28)]">
          FW
        </div>

        <div>
          <p className="mb-2.5 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--showcase-eyebrow)]">
            Funny Web Identity
          </p>
          <h1 className="m-0 text-[clamp(3rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.08em] uppercase text-[var(--showcase-text)]">
            <Shuffle
              text="Funny Web"
              tag="span"
              shuffleDirection="right"
              duration={1.2}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.1}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              loop={true}
              loopDelay={0.6}
              colorFrom="var(--shuffle-color-from)"
              colorTo="var(--shuffle-color-to)"
              className="inline-block min-h-[1em]"
            />
          </h1>
        </div>
      </div>

      <p className="m-0 max-w-[24rem] text-[1.05rem] text-[var(--showcase-copy)]">
        轻量、安全、直接。登录后继续你的项目与团队工作区。
      </p>

      <div className="max-w-[25rem] rounded-[22px] border border-[var(--showcase-card-border)] bg-[var(--showcase-card-bg)] px-5 py-[18px] transition-colors duration-300">
        <span className="mb-2.5 inline-flex rounded-full bg-[var(--accent-soft)] px-[10px] py-1.5 text-[0.78rem] uppercase tracking-[0.08em] text-[var(--accent-text)]">
          React Bits Shuffle
        </span>
        <p className="m-0 text-[var(--showcase-copy)]">
          持续循环的文字洗牌动画作为品牌入口，左侧只保留必要信息，不再堆叠说明模块。
        </p>
      </div>
    </aside>
  );
}

export default BrandPanel;
