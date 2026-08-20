import { useEffect, useState } from 'react';
import { stageImage } from '../game/images';
import { SahurSVG } from './SahurSVG';

/**
 * Character artwork layers:
 *  1. inline SVG (always available, shows instantly);
 *  2. local file `public/chars/stageN.png` (if bundled — recommended
 *     for Yandex Games: drop the 5 PNGs into public/chars/);
 *  3. remote AI-rendered image.
 * If every raster fails, the SVG stays — the game never shows a
 * broken portrait.
 */
export function StageArt({
  stage,
  className,
}: {
  stage: number;
  className?: string;
}) {
  const local = `${import.meta.env.BASE_URL}chars/stage${stage}.png`;
  const remote = stageImage(stage);
  const [idx, setIdx] = useState(0);
  useEffect(() => setIdx(0), [stage]);
  const srcs = [local, remote];
  return (
    <div className={`relative overflow-hidden bg-ink2 ${className ?? ''}`}>
      <SahurSVG stage={stage} className="absolute inset-0 h-full w-full" />
      {idx < srcs.length && (
        <img
          src={srcs[idx]}
          alt=""
          draggable={false}
          onError={() => setIdx((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
