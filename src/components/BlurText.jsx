import { useEffect, useState } from "react";

function BlurText({ text, className = "", delay = 260, duration = 700 }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const characters = Array.from(text);

  useEffect(() => {
    let index = 0;
    const timers = [];

    const revealNext = () => {
      index += 1;
      setVisibleCount(index);

      if (index < characters.length) {
        timers.push(window.setTimeout(revealNext, delay));
      }
    };

    timers.push(window.setTimeout(revealNext, 120));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [characters.length, delay, text]);

  return (
    <span className={className}>
      {characters.map((character, index) => {
        const visible = index < visibleCount;

        return (
          <span
            key={`${character}-${index}`}
            style={{
              display: "inline-block",
              whiteSpace: character === " " ? "pre" : "normal",
              filter: visible ? "blur(0px)" : "blur(14px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `filter ${duration}ms ease, opacity ${duration}ms ease, transform ${duration}ms ease`,
            }}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
}

export default BlurText;
