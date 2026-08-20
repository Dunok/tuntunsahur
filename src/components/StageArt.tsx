import { useState } from 'react';
import { stageImage } from '../game/images';
import { SahurSVG } from './SahurSVG';

/**
 * Character artwork: inline SVG (always works) with the AI-rendered
 * image layered on top. If the remote image fails to load, the SVG
 * remains — the game never shows a broken/empty portrait.
 */
export function StageArt({
  stage,
  className,
}: {
  stage: number;
  className?: string;
}) {
  // remember which stage failed to load, so a new stage retries its own image
  const [failedStage, setFailedStage] = useState(0);
  return (
    <div className={`relative overflow-hidden bg-ink2 ${className ?? ''}`}>
      <SahurSVG stage={stage} className="absolute inset-0 h-full w-full" />
      {failedStage !== stage && (
        <img
          src={stageImage(stage)}
          alt=""
          draggable={false}
          onError={() => setFailedStage(stage)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
