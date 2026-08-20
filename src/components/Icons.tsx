import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'flame'
  | 'zap'
  | 'fist'
  | 'dumbbell'
  | 'kettlebell'
  | 'barbell'
  | 'plate'
  | 'smith'
  | 'goldbar'
  | 'titan'
  | 'exo'
  | 'bro'
  | 'shaker'
  | 'whistle'
  | 'chip'
  | 'robot'
  | 'clone'
  | 'factory'
  | 'portal'
  | 'chalk'
  | 'prework'
  | 'target'
  | 'trophy'
  | 'medal'
  | 'star'
  | 'crown'
  | 'gear'
  | 'soundOn'
  | 'soundOff'
  | 'play'
  | 'gift'
  | 'x'
  | 'lock'
  | 'check'
  | 'arrowUp'
  | 'clock'
  | 'globe'
  | 'reset'
  | 'cloud'
  | 'cloudOff'
  | 'combo'
  | 'info';

const P: Record<IconName, ReactNode> = {
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  fist: <path d="M4 4l7.5 16.5 2.3-6.7 6.7-2.3L4 4zM13.5 10.5 19 5" />,
  dumbbell: (
    <>
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7" />
    </>
  ),
  kettlebell: (
    <>
      <circle cx="12" cy="14.5" r="6" />
      <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
    </>
  ),
  barbell: (
    <>
      <path d="M4 9v6M20 9v6M7.5 5.5v13M16.5 5.5v13M7.5 12h9M1.5 12H4M20 12h2.5" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21" />
    </>
  ),
  smith: (
    <>
      <path d="M5 3v18M19 3v18M5 6h14M5 18h14" />
      <path d="M9 11h6M12 9v4" />
    </>
  ),
  goldbar: (
    <>
      <path d="M6 9h12l2.5 6h-17L6 9z" />
      <path d="M3.5 15h17M9 9l1.5-3h3L15 9" />
    </>
  ),
  titan: (
    <>
      <path d="M12 2 20 6.5v9L12 22 4 15.5v-9L12 2z" />
      <path d="m13 8-3 5h4l-3 5" />
    </>
  ),
  exo: (
    <>
      <rect x="5" y="9" width="14" height="10" rx="2" />
      <path d="M12 5v4M9 5h6M9 13h.01M15 13h.01M9 19v2M15 19v2" />
    </>
  ),
  bro: (
    <>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
    </>
  ),
  shaker: (
    <>
      <path d="M10 2h4v3l2.5 3.5V20a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V8.5L10 5V2z" />
      <path d="M7.5 12h9M7.5 16h9" />
    </>
  ),
  whistle: (
    <>
      <circle cx="9" cy="15" r="5" />
      <path d="M13.5 12.5 21 8v4l-6 3.5M9 15h.01" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M7 2.5v3M17 2.5v3M7 18.5v3M17 18.5v3" />
    </>
  ),
  robot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <path d="M12 4v4M9 4h6M9.5 12.5h.01M14.5 12.5h.01M9 16h6" />
    </>
  ),
  clone: (
    <>
      <circle cx="9" cy="7.5" r="3" />
      <path d="M3 21v-.5a6 6 0 0 1 9.5-5" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M14 21v-.5a5 5 0 0 1 7-4.6" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 3.5V10l6 3.5V10l6 3.5V21H3z" />
      <path d="M7 3h3v4M17 17h.01M13 17h.01" />
    </>
  ),
  portal: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="9" />
      <ellipse cx="12" cy="12" rx="4.5" ry="4.5" />
      <path d="M12 3c2 2.5 2 15.5 0 18" />
    </>
  ),
  chalk: (
    <>
      <path d="M8 3h8l2 5.5V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V8.5L8 3z" />
      <path d="M9.5 12h.01M13 15h.01M11 18h.01M14.5 11h.01" />
    </>
  ),
  prework: (
    <>
      <path d="M6 3h12l-1.5 17a1.6 1.6 0 0 1-1.6 1.5H9.1A1.6 1.6 0 0 1 7.5 20L6 3z" />
      <path d="m13 7-2.5 4.5h3L11 16" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a1 1 0 0 0-1 1c0 2.5 1.5 4 4 4M17 6h3a1 1 0 0 1 1 1c0 2.5-1.5 4-4 4" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="m8.5 10.5-3-7.5M15.5 10.5l3-7.5M9 3l3 6 3-6" />
    </>
  ),
  star: (
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6z" />
  ),
  crown: <path d="M3 18 5 8l5 5 2-8 2 8 5-5 2 10H3zM3 21h18" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>
  ),
  soundOn: (
    <>
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5z" />
      <path d="M15 9.5a4 4 0 0 1 0 5M17.5 7a8 8 0 0 1 0 10" />
    </>
  ),
  soundOff: (
    <>
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  play: <path d="M7 4.5v15l12-7.5L7 4.5z" />,
  gift: (
    <>
      <rect x="3.5" y="8" width="17" height="4" />
      <path d="M5 12v9h14v-9M12 8v13M12 8s-4.5.5-5.5-2C5.8 4.2 7.5 3 8.8 3.6 10.8 4.5 12 8 12 8zM12 8s4.5.5 5.5-2c.7-1.8-1-3-2.3-2.4C13.2 4.5 12 8 12 8z" />
    </>
  ),
  x: <path d="M5 5l14 14M19 5 5 19" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5L19.5 7" />,
  arrowUp: <path d="M12 20V4M5.5 10.5 12 4l6.5 6.5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9z" />
    </>
  ),
  reset: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </>
  ),
  cloud: <path d="M6.5 19a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 17.8 8.6 4.8 4.8 0 0 1 17 19H6.5z" />,
  cloudOff: (
    <>
      <path d="M6.5 19a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 17.8 8.6 4.8 4.8 0 0 1 17 19H6.5z" />
      <path d="M4 4l16 16" />
    </>
  ),
  combo: <path d="M4 19V13M10 19V9M16 19V5M20 5l-2.5 2.5M20 5h-4M20 5v4" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {P[name]}
    </svg>
  );
}
