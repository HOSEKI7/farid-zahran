import React from "react";
import type { ProjectBlock } from "@/lib/types";
import { NarrativeBlock } from "./narrative-block";
import { GalleryBlock } from "./gallery-block";
import { MetricsBlock } from "./metrics-block";

export interface BlockRendererProps {
  blocks: ProjectBlock[];
}

/**
 * Satu-satunya tempat yang tahu pemetaan `type` → komponen.
 * `never` di default memaksa switch tetap exhaustive: menambah varian block
 * di types.ts tanpa menambah case di sini akan gagal compile.
 */
function renderBlock(block: ProjectBlock, key: number) {
  switch (block.type) {
    case "narrative":
      return (
        <NarrativeBlock
          key={key}
          heading={block.heading}
          paragraphs={block.paragraphs}
        />
      );
    case "gallery":
      if (block.layout === "full-bleed") {
        return <GalleryBlock key={key} layout={block.layout} heroImage={block.heroImage} />;
      }
      return (
        <GalleryBlock key={key} layout={block.layout} images={block.images} />
      );
    case "metrics":
      return (
        <MetricsBlock key={key} heading={block.heading} items={block.items} />
      );
    default: {
      const exhaustiveCheck: never = block;
      return exhaustiveCheck;
    }
  }
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BlockRenderer;
