"use client";
import { ComponentProps, useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export type JobTitleScrambleProps = {
  titles: string[];
  interval?: number;
  scrambleSpeed?: number;
  random?: boolean;
} & ComponentProps<"div">;

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const JobTitleScramble = ({
  titles,
  interval = 4000,
  scrambleSpeed = 2,
  random = true,
  className,
  ...props
}: JobTitleScrambleProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { contextSafe } = useGSAP();

  const animateToTitle = useCallback(
    (nextTitle: string) => {
      contextSafe(() => {
        const target = wrapperRef.current;
        if (!target) return;

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
          target.innerText = nextTitle;
          return;
        }

        if (gsap.isTweening(target)) return;

        gsap.to(target, {
          duration: 1,
          ease: "sine.in",
          scrambleText: {
            text: nextTitle,
            speed: scrambleSpeed,
            chars: random ? defaultChars : nextTitle.replace(/\s/g, ""),
          },
        });
      })();
    },
    [contextSafe, scrambleSpeed, random]
  );

  const scrambleCurrent = useCallback(() => {
    contextSafe(() => {
      const target = wrapperRef.current;
      if (!target) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;
      if (gsap.isTweening(target)) return;

      const currentTitle = titles[currentIndexRef.current] || target.innerText;

      gsap.to(target, {
        duration: 1,
        ease: "sine.in",
        scrambleText: {
          text: currentTitle,
          speed: scrambleSpeed,
          chars: random ? defaultChars : currentTitle.replace(/\s/g, ""),
        },
      });
    })();
  }, [contextSafe, scrambleSpeed, random, titles]);

  useEffect(() => {
    if (!titles || titles.length === 0) return;

    const nextCycle = () => {
      if (isHoveredRef.current || !titles || titles.length === 0) return;
      const nextIndex = (currentIndexRef.current + 1) % titles.length;
      currentIndexRef.current = nextIndex;
      animateToTitle(titles[nextIndex]);
    };

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(nextCycle, interval);
    };

    startTimer();

    const target = wrapperRef.current;

    const handlePointerEnter = () => {
      isHoveredRef.current = true;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      scrambleCurrent();
    };

    const handlePointerLeave = () => {
      isHoveredRef.current = false;
      startTimer();
    };

    target?.addEventListener("pointerenter", handlePointerEnter);
    target?.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      target?.removeEventListener("pointerenter", handlePointerEnter);
      target?.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [titles, interval, scrambleSpeed, random, animateToTitle, scrambleCurrent]);

  const initialText = titles && titles.length > 0 ? titles[0] : "";

  return (
    <div {...props} className={className} ref={wrapperRef}>
      {initialText}
    </div>
  );
};

export default JobTitleScramble;
