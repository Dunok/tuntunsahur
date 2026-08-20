export interface TrainerInfo {
  id: string;
  lvl: number;
}

const OUTLINE = '#231610';
const SW = 3;

function Base({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 80 110" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="40" cy="103" rx="21" ry="5" fill="rgba(0,0,0,0.35)" />
      <g stroke={OUTLINE} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}

function Bro() {
  return (
    <Base>
      <rect x="29" y="82" width="9" height="20" rx="3" fill="#2e3950" />
      <rect x="42" y="82" width="9" height="20" rx="3" fill="#2e3950" />
      <rect x="25" y="54" width="30" height="30" rx="8" fill="#3f8fd4" />
      <path d="M25 62 12 58" stroke="#f0c8a0" strokeWidth="7" />
      <circle cx="10" cy="57" r="4" fill="#f0c8a0" />
      <path d="M55 62 66 50" stroke="#f0c8a0" strokeWidth="7" />
      <circle cx="68" cy="48" r="4" fill="#f0c8a0" />
      <rect x="60" y="40" width="22" height="5" rx="2.5" fill="#9fb2c8" />
      <rect x="58" y="35" width="6" height="15" rx="2" fill="#5b6b84" />
      <rect x="78" y="35" width="6" height="15" rx="2" fill="#5b6b84" />
      <circle cx="40" cy="36" r="16" fill="#f0c8a0" />
      <path d="M24 32a16 16 0 0 1 32 0v2H24z" fill="#ff7a2f" />
      <path d="M52 32h10a2 2 0 0 1 0 4H52z" fill="#ff7a2f" />
      <circle cx="34" cy="39" r="1.8" fill={OUTLINE} stroke="none" />
      <circle cx="45" cy="39" r="1.8" fill={OUTLINE} stroke="none" />
      <path d="M35 45q5 4 10 0" fill="none" strokeWidth="2.4" />
    </Base>
  );
}

function Shaker() {
  return (
    <Base>
      <path d="M30 42h20l5 52a6 6 0 0 1-6 6H31a6 6 0 0 1-6-6z" fill="#8fd460" />
      <rect x="28" y="28" width="24" height="14" rx="4" fill="#2e3950" />
      <rect x="36" y="20" width="8" height="8" rx="3" fill="#5b6b84" />
      <path d="M18 55q-6 8 0 16M62 55q6 8 0 16" fill="none" stroke="#8b98ad" strokeWidth="2.5" />
      <circle cx="34" cy="62" r="3.4" fill="#fff" />
      <circle cx="34" cy="62" r="1.6" fill={OUTLINE} stroke="none" />
      <circle cx="46" cy="62" r="3.4" fill="#fff" />
      <circle cx="46" cy="62" r="1.6" fill={OUTLINE} stroke="none" />
      <path d="M34 72q6 5 12 0" fill="none" strokeWidth="2.4" />
      <path d="M28 80h24" strokeWidth="2.2" stroke="#5a9440" />
      <path d="M31 100l-2 6M49 100l2 6" stroke="#5a9440" strokeWidth="5" />
    </Base>
  );
}

function Coach() {
  return (
    <Base>
      <rect x="30" y="84" width="8" height="18" rx="3" fill="#e8b48c" />
      <rect x="42" y="84" width="8" height="18" rx="3" fill="#e8b48c" />
      <rect x="27" y="72" width="26" height="16" rx="5" fill="#232a38" />
      <rect x="25" y="50" width="30" height="26" rx="7" fill="#ff7a2f" />
      <path d="M34 50l6 6 6-6" fill="none" strokeWidth="2.4" stroke="#c2551a" />
      <path d="M25 58 12 66" stroke="#e8b48c" strokeWidth="7" />
      <circle cx="10" cy="68" r="6" fill="#ece6d9" />
      <path d="M10 65v3l2 2" fill="none" strokeWidth="1.8" />
      <path d="M55 58l10 8" stroke="#e8b48c" strokeWidth="7" />
      <circle cx="40" cy="32" r="15" fill="#e8b48c" />
      <path d="M26 28q4-10 14-10t14 10q-6-5-14-5t-14 5z" fill="#5a4632" />
      <circle cx="34" cy="33" r="1.8" fill={OUTLINE} stroke="none" />
      <circle cx="45" cy="33" r="1.8" fill={OUTLINE} stroke="none" />
      <path d="M35 40q5 3 10 0" fill="none" strokeWidth="2.4" />
      <path d="M40 44v6" strokeWidth="2" stroke="#8b98ad" />
      <circle cx="40" cy="53" r="3.4" fill="#ffc247" />
    </Base>
  );
}

function Smart() {
  return (
    <Base>
      <rect x="20" y="90" width="40" height="12" rx="5" fill="#39445c" />
      <circle cx="28" cy="102" r="4" fill="#232a38" />
      <circle cx="52" cy="102" r="4" fill="#232a38" />
      <rect x="36" y="52" width="8" height="40" fill="#5b6b84" />
      <rect x="22" y="18" width="36" height="34" rx="7" fill="#232a38" />
      <rect x="27" y="23" width="26" height="24" rx="4" fill="#101823" />
      <path d="M33 32v5M47 32v5" stroke="#4fd1c5" strokeWidth="3" />
      <path d="M33 42q7 5 14 0" fill="none" stroke="#4fd1c5" strokeWidth="2.6" />
      <circle cx="58" cy="14" r="3" fill="#ff7a2f" />
      <path d="M55 18 50 22" strokeWidth="2.4" stroke="#8b98ad" />
      <path d="M22 34 10 40M10 40l4 10" fill="none" stroke="#8b98ad" strokeWidth="3" />
      <rect x="6" y="48" width="10" height="6" rx="2" fill="#5b6b84" />
    </Base>
  );
}

function Robot() {
  return (
    <Base>
      <rect x="22" y="92" width="36" height="12" rx="5" fill="#39445c" />
      <circle cx="30" cy="98" r="4" fill="#232a38" />
      <circle cx="40" cy="98" r="4" fill="#232a38" />
      <circle cx="50" cy="98" r="4" fill="#232a38" />
      <rect x="25" y="56" width="30" height="34" rx="7" fill="#9fb2c8" />
      <rect x="32" y="64" width="16" height="10" rx="3" fill="#232a38" />
      <path d="M35 69h10" stroke="#4fd1c5" strokeWidth="2.4" />
      <path d="M25 64 12 58M55 64l13-6" stroke="#9fb2c8" strokeWidth="7" />
      <path d="M8 52l6 5-8 3M72 46l-6 5 8 3" fill="#c3d2e2" strokeWidth="2.4" />
      <rect x="28" y="28" width="24" height="22" rx="6" fill="#c3d2e2" />
      <circle cx="35" cy="39" r="3.4" fill="#ff7a2f" />
      <circle cx="45" cy="39" r="3.4" fill="#ff7a2f" />
      <path d="M40 28V18" strokeWidth="2.6" stroke="#8b98ad" />
      <circle cx="40" cy="15" r="3.4" fill="#ffc247" />
    </Base>
  );
}

function Clone() {
  return (
    <Base>
      <rect x="26" y="52" width="28" height="46" rx="13" fill="#c68b59" />
      <path d="M33 55v40M40 53v44M47 55v40" stroke="#a76b3f" strokeWidth="2" />
      <rect x="24" y="62" width="32" height="5" rx="2.5" fill="#6d6f74" />
      <rect x="24" y="84" width="32" height="5" rx="2.5" fill="#6d6f74" />
      <path d="M26 70 16 66M54 70l10-4" stroke="#c68b59" strokeWidth="6" />
      <circle cx="34" cy="74" r="2.2" fill={OUTLINE} stroke="none" />
      <circle cx="45" cy="74" r="2.2" fill={OUTLINE} stroke="none" />
      <path d="M35 80q5 3 10 0" fill="none" strokeWidth="2.2" />
      <path d="M29 98l-1 6M51 98l1 6" stroke="#a76b3f" strokeWidth="5" />
      <path d="m14 46 2 4 4 2-4 2-2 4-2-4-4-2 4-2zM64 40l1.6 3.2 3.4 1.8-3.4 1.8-1.6 3.2-1.6-3.2-3.4-1.8 3.4-1.8z" fill="#ffc247" strokeWidth="1.6" />
    </Base>
  );
}

function Factory() {
  return (
    <Base>
      <rect x="48" y="26" width="10" height="34" fill="#8a4030" />
      <circle cx="53" cy="18" r="4" fill="#8b98ad" stroke="none" opacity="0.8" />
      <circle cx="59" cy="10" r="3" fill="#8b98ad" stroke="none" opacity="0.5" />
      <rect x="16" y="58" width="48" height="44" fill="#a3543f" />
      <path d="M16 58 28 46l12 12 12-12 12 12z" fill="#c2553c" />
      <rect x="34" y="80" width="12" height="22" fill="#5a2b20" />
      <circle cx="25" cy="70" r="5" fill="#ffc247" />
      <circle cx="55" cy="70" r="5" fill="#ffc247" />
      <path d="M25 66v4l2.5 2.5M55 66v4l2.5 2.5" fill="none" strokeWidth="1.8" />
      <circle cx="40" cy="70" r="6" fill="#9fb2c8" />
      <path d="M40 65v10M35 70h10" strokeWidth="1.8" />
    </Base>
  );
}

function Portal() {
  return (
    <Base>
      <rect x="18" y="94" width="44" height="10" rx="4" fill="#39445c" />
      <ellipse cx="40" cy="56" rx="21" ry="36" fill="#151a24" stroke="#ffc247" strokeWidth="4.5" />
      <ellipse cx="40" cy="56" rx="13" ry="26" fill="none" stroke="#ff7a2f" strokeWidth="3" />
      <ellipse cx="40" cy="56" rx="5.5" ry="13" fill="#3d2b12" stroke="#ffc247" strokeWidth="2" />
      <path d="m40 48 1.8 3.6 3.8.6-2.8 2.7.7 3.9-3.5-1.9-3.5 1.9.7-3.9-2.8-2.7 3.8-.6z" fill="#ffc247" strokeWidth="1.4" />
      <circle cx="22" cy="34" r="2" fill="#ffc247" stroke="none" />
      <circle cx="60" cy="70" r="2" fill="#ffc247" stroke="none" />
    </Base>
  );
}

function TrainerSprite({ id }: { id: string }) {
  switch (id) {
    case 'bro':
      return <Bro />;
    case 'shaker':
      return <Shaker />;
    case 'coach':
      return <Coach />;
    case 'smart':
      return <Smart />;
    case 'robot':
      return <Robot />;
    case 'clone':
      return <Clone />;
    case 'factory':
      return <Factory />;
    case 'portal':
      return <Portal />;
    default:
      return <Bro />;
  }
}

/* Floor slots around the character (purchase order → nearest first). */
const SLOTS: { pos: string; scale: string; bob: string }[] = [
  {
    pos: 'left-1/2 -translate-x-[128px] sm:-translate-x-[224px]',
    scale: 'w-14 sm:w-[72px]',
    bob: '2.1s',
  },
  {
    pos: 'left-1/2 translate-x-[72px] sm:translate-x-[152px]',
    scale: 'w-14 sm:w-[72px]',
    bob: '2.6s',
  },
  {
    pos: 'left-1/2 -translate-x-[216px] hidden sm:block sm:-translate-x-[330px]',
    scale: 'sm:w-[64px]',
    bob: '2.3s',
  },
  {
    pos: 'left-1/2 translate-x-[160px] hidden sm:block sm:translate-x-[258px]',
    scale: 'sm:w-[64px]',
    bob: '2.9s',
  },
  {
    pos: 'left-1/2 -translate-x-[300px] hidden lg:block lg:-translate-x-[438px]',
    scale: 'lg:w-[58px]',
    bob: '2.5s',
  },
];

export function Trainers({
  trainers,
  lvlLabel,
}: {
  trainers: TrainerInfo[];
  lvlLabel: string;
}) {
  if (trainers.length === 0) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15]"
      aria-hidden="true"
    >
      {trainers.map((tr, i) => {
        const slot = SLOTS[i];
        if (!slot) return null;
        return (
          <div
            key={tr.id}
            className={`anim-pop absolute bottom-[calc(50%-34px)] sm:bottom-[calc(50%-64px)] lg:bottom-[calc(50%-86px)] ${slot.pos}`}
          >
            <div
              className="anim-bob"
              style={{ animationDuration: slot.bob }}
            >
              <div className={slot.scale}>
                <TrainerSprite id={tr.id} />
              </div>
              <div className="mx-auto -mt-1 w-max rounded-full border border-line bg-ink2/85 px-1.5 py-px text-[9px] font-extrabold text-chalk/90">
                {lvlLabel} {tr.lvl}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
