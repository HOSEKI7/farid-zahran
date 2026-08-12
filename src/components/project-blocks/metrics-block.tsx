"use client";

import React from "react";
import {
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { MetricItem } from "@/lib/types";

export interface MetricsBlockProps {
  heading?: string;
  items: MetricItem[];
}

/**
 * Memecah "1.2k+" jadi prefix / angka / suffix supaya count-up hanya menyentuh
 * bagian numeriknya dan simbol di sekitarnya tetap utuh.
 */
function splitNumeric(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;

  const decimals = digits.includes(".")
    ? digits.split(".")[1].length
    : 0;

  return { prefix, target, suffix, decimals };
}

const CountUpValue: React.FC<{ value: string }> = ({ value }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const parsed = React.useMemo(() => splitNumeric(value), [value]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || !parsed || shouldReduceMotion || !isInView) return;

    const format = (n: number) =>
      `${parsed.prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })}${parsed.suffix}`;

    const controls: AnimationPlaybackControls = animate(0, parsed.target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, parsed, shouldReduceMotion]);

  // Nilai penuh dirender sebagai teks awal, jadi tanpa JS atau tanpa motion
  // angkanya tetap benar dan terbaca screen reader.
  return <span ref={ref}>{value}</span>;
};

export const MetricsBlock: React.FC<MetricsBlockProps> = ({
  heading,
  items,
}) => {
  return (
    <ScrollReveal
      direction="up"
      distance={28}
      amount={0.25}
      className="mx-auto w-full max-w-[1400px] px-6 md:px-10"
    >
      {heading && (
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {heading}
        </h2>
      )}
      <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="border-t border-border/60 pt-5">
            <dd className="font-mono text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              <CountUpValue value={item.value} />
            </dd>
            <dt className="mt-3 text-sm font-medium text-foreground">
              {item.label}
            </dt>
            {item.detail && (
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            )}
          </div>
        ))}
      </dl>
    </ScrollReveal>
  );
};

export default MetricsBlock;
