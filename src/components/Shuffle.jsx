import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

function Shuffle({
  text,
  className = "",
  style = {},
  shuffleDirection = "right",
  duration = 0.35,
  maxDelay = 0,
  ease = "power3.out",
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = "evenodd",
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = "",
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true,
}) {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef(null);
  const wrappersRef = useRef([]);
  const tlRef = useRef(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef(null);

  const userHasFont = useMemo(
    () => Boolean(style.fontFamily) || /font[-[]/i.test(className),
    [style, className],
  );

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const matches = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || "");
    const marginValue = matches ? parseFloat(matches[1]) : 0;
    const marginUnit = matches ? matches[2] || "px" : "px";
    const sign =
      marginValue === 0 ? "" : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;

    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useEffect(() => {
    if ("fonts" in document) {
      if (document.fonts.status === "loaded") {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true));
      }
      return;
    }

    setFontsLoaded(true);
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) {
        return undefined;
      }

      if (
        respectReducedMotion &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setReady(true);
        onShuffleComplete?.();
        return undefined;
      }

      const element = ref.current;
      const computedFont = userHasFont
        ? style.fontFamily || getComputedStyle(element).fontFamily || ""
        : "'Press Start 2P', sans-serif";

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener("mouseenter", hoverHandlerRef.current);
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }

        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrapper) => {
            const inner = wrapper.firstElementChild;
            const original = inner?.querySelector("[data-orig='1']");

            if (original && wrapper.parentNode) {
              wrapper.parentNode.replaceChild(original, wrapper);
            }
          });
          wrappersRef.current = [];
        }

        try {
          splitRef.current?.revert();
        } catch {
          /* noop */
        }

        splitRef.current = null;
        playingRef.current = false;
      };

      const build = () => {
        teardown();

        splitRef.current = new GSAPSplitText(element, {
          type: "chars",
          charsClass: "shuffle-char",
          wordsClass: "shuffle-word",
          linesClass: "shuffle-line",
          smartWrap: true,
          reduceWhiteSpace: false,
        });

        const chars = splitRef.current.chars || [];
        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const randomChar = (charset) => charset.charAt(Math.floor(Math.random() * charset.length)) || "";

        chars.forEach((charNode) => {
          const parent = charNode.parentElement;

          if (!parent) {
            return;
          }

          const width = charNode.getBoundingClientRect().width;
          const height = charNode.getBoundingClientRect().height;

          if (!width) {
            return;
          }

          const wrapper = document.createElement("span");
          wrapper.className = "shuffle-wrapper";
          Object.assign(wrapper.style, {
            display: "inline-block",
            overflow: "hidden",
            width: `${width}px`,
            height: shuffleDirection === "up" || shuffleDirection === "down" ? `${height}px` : "auto",
            verticalAlign: "bottom",
            textAlign: "left",
          });

          const inner = document.createElement("span");
          inner.className = "shuffle-strip";
          Object.assign(inner.style, {
            display: "inline-block",
            whiteSpace: shuffleDirection === "up" || shuffleDirection === "down" ? "normal" : "nowrap",
            willChange: "transform",
            transformOrigin: "left center",
          });

          parent.insertBefore(wrapper, charNode);
          wrapper.appendChild(inner);

          const firstOriginal = charNode.cloneNode(true);
          Object.assign(firstOriginal.style, {
            display: shuffleDirection === "up" || shuffleDirection === "down" ? "block" : "inline-block",
            width: `${width}px`,
            fontFamily: computedFont,
            textAlign: "left",
          });

          charNode.setAttribute("data-orig", "1");
          Object.assign(charNode.style, {
            display: shuffleDirection === "up" || shuffleDirection === "down" ? "block" : "inline-block",
            width: `${width}px`,
            fontFamily: computedFont,
            textAlign: "left",
          });

          inner.appendChild(firstOriginal);

          for (let index = 0; index < rolls; index += 1) {
            const clone = charNode.cloneNode(true);

            if (scrambleCharset) {
              clone.textContent = randomChar(scrambleCharset);
            }

            Object.assign(clone.style, {
              display: shuffleDirection === "up" || shuffleDirection === "down" ? "block" : "inline-block",
              width: `${width}px`,
              fontFamily: computedFont,
              textAlign: "left",
            });

            inner.appendChild(clone);
          }

          inner.appendChild(charNode);

          const steps = rolls + 1;

          if (shuffleDirection === "right" || shuffleDirection === "down") {
            const firstCopy = inner.firstElementChild;
            const real = inner.lastElementChild;

            if (real) {
              inner.insertBefore(real, inner.firstChild);
            }

            if (firstCopy) {
              inner.appendChild(firstCopy);
            }
          }

          let startX = 0;
          let finalX = 0;
          let startY = 0;
          let finalY = 0;

          if (shuffleDirection === "right") {
            startX = -steps * width;
          } else if (shuffleDirection === "left") {
            finalX = -steps * width;
          } else if (shuffleDirection === "down") {
            startY = -steps * height;
          } else if (shuffleDirection === "up") {
            finalY = -steps * height;
          }

          if (shuffleDirection === "left" || shuffleDirection === "right") {
            gsap.set(inner, { x: startX, y: 0, force3D: true });
            inner.setAttribute("data-start-x", String(startX));
            inner.setAttribute("data-final-x", String(finalX));
          } else {
            gsap.set(inner, { x: 0, y: startY, force3D: true });
            inner.setAttribute("data-start-y", String(startY));
            inner.setAttribute("data-final-y", String(finalY));
          }

          if (colorFrom) {
            inner.style.color = colorFrom;
          }

          wrappersRef.current.push(wrapper);
        });
      };

      const inners = () => wrappersRef.current.map((wrapper) => wrapper.firstElementChild);

      const randomizeScrambles = () => {
        if (!scrambleCharset) {
          return;
        }

        wrappersRef.current.forEach((wrapper) => {
          const strip = wrapper.firstElementChild;

          if (!strip) {
            return;
          }

          const children = Array.from(strip.children);

          for (let index = 1; index < children.length - 1; index += 1) {
            children[index].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
          }
        });
      };

      const cleanupToStill = () => {
        wrappersRef.current.forEach((wrapper) => {
          const strip = wrapper.firstElementChild;

          if (!strip) {
            return;
          }

          const real = strip.querySelector("[data-orig='1']");

          if (!real) {
            return;
          }

          strip.replaceChildren(real);
          strip.style.transform = "none";
          strip.style.willChange = "auto";
        });
      };

      const play = () => {
        const strips = inners();

        if (!strips.length) {
          return;
        }

        playingRef.current = true;
        const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

        const timeline = gsap.timeline({
          smoothChildTiming: true,
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: () => {
            if (scrambleCharset) {
              randomizeScrambles();
            }

            if (isVertical) {
              gsap.set(strips, {
                y: (_, target) => parseFloat(target.getAttribute("data-start-y") || "0"),
              });
            } else {
              gsap.set(strips, {
                x: (_, target) => parseFloat(target.getAttribute("data-start-x") || "0"),
              });
            }

            onShuffleComplete?.();
          },
          onComplete: () => {
            playingRef.current = false;

            if (!loop) {
              cleanupToStill();

              if (colorTo) {
                gsap.set(strips, { color: colorTo });
              }

              onShuffleComplete?.();
              armHover();
            }
          },
        });

        const addTween = (targets, at) => {
          const tweenVars = {
            duration,
            ease,
            force3D: true,
            stagger: animationMode === "evenodd" ? stagger : 0,
          };

          if (isVertical) {
            tweenVars.y = (_, target) => parseFloat(target.getAttribute("data-final-y") || "0");
          } else {
            tweenVars.x = (_, target) => parseFloat(target.getAttribute("data-final-x") || "0");
          }

          timeline.to(targets, tweenVars, at);

          if (colorFrom && colorTo) {
            timeline.to(targets, { color: colorTo, duration, ease }, at);
          }
        };

        if (animationMode === "evenodd") {
          const odd = strips.filter((_, index) => index % 2 === 1);
          const even = strips.filter((_, index) => index % 2 === 0);
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
          const evenStart = odd.length ? oddTotal * 0.7 : 0;

          if (odd.length) {
            addTween(odd, 0);
          }

          if (even.length) {
            addTween(even, evenStart);
          }
        } else {
          strips.forEach((strip) => {
            const delay = Math.random() * maxDelay;
            const tweenVars = {
              duration,
              ease,
              force3D: true,
            };

            if (isVertical) {
              tweenVars.y = parseFloat(strip.getAttribute("data-final-y") || "0");
            } else {
              tweenVars.x = parseFloat(strip.getAttribute("data-final-x") || "0");
            }

            timeline.to(strip, tweenVars, delay);

            if (colorFrom && colorTo) {
              timeline.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, delay);
            }
          });
        }

        tlRef.current = timeline;
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current) {
          return;
        }

        removeHover();

        const handler = () => {
          if (playingRef.current) {
            return;
          }

          build();

          if (scrambleCharset) {
            randomizeScrambles();
          }

          play();
        };

        hoverHandlerRef.current = handler;
        ref.current.addEventListener("mouseenter", handler);
      };

      const create = () => {
        build();

        if (scrambleCharset) {
          randomizeScrambles();
        }

        play();
        armHover();
        setReady(true);
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: scrollTriggerStart,
        once: triggerOnce,
        onEnter: create,
      });

      return () => {
        scrollTrigger.kill();
        removeHover();
        teardown();
        setReady(false);
      };
    },
    {
      dependencies: [
        text,
        duration,
        maxDelay,
        ease,
        scrollTriggerStart,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
        onShuffleComplete,
        userHasFont,
      ],
      scope: ref,
    },
  );

  const classes = useMemo(
    () => `shuffle-text ${ready ? "shuffle-text--ready" : "shuffle-text--hidden"} ${className}`.trim(),
    [ready, className],
  );

  const Tag = tag || "p";
  const commonStyle = useMemo(
    () => ({
      display: "inline-block",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      willChange: "transform",
      textTransform: "uppercase",
      lineHeight: 1,
      textAlign,
      ...style,
    }),
    [textAlign, style],
  );

  return React.createElement(Tag, { ref, className: classes, style: commonStyle }, text);
}

export default Shuffle;
