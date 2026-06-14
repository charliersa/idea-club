// club_ui.jsx — shared building blocks: seeded duotone "riso" placeholders, icons,
// auto-scroll marquee, modal, small bits. Exported to window for the app file.

const { useState, useRef, useEffect } = React;

/* ---------- seeded RNG ---------- */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const INK_VAR = { pink: 'var(--k-pink)', blue: 'var(--k-blue)', grape: 'var(--k-grape)' };

/* ---------- RisoImage : procedural duotone artwork placeholder ---------- */
function RisoImage({ seed = 1, inks = ['pink', 'blue'], className = '', style = {} }) {
  const rnd = mulberry32(seed * 2654435761 % 2147483647);
  const A = INK_VAR[inks[0]] || INK_VAR.pink;
  const B = INK_VAR[inks[1]] || INK_VAR.blue;
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

  const shape = (fill, off) => {
    const kind = pick(['circle', 'ring', 'tri', 'wedge', 'bar', 'wave', 'dots']);
    const x = 18 + rnd() * 84,y = 18 + rnd() * 84;
    const r = 16 + rnd() * 34;
    const rot = Math.floor(rnd() * 360);
    const common = { style: { fill, mixBlendMode: 'multiply' }, transform: `translate(${off},${off})` };
    switch (kind) {
      case 'circle':return <circle cx={x} cy={y} r={r} {...common} />;
      case 'ring':return <circle cx={x} cy={y} r={r} fill="none" style={{ stroke: fill, strokeWidth: 6 + rnd() * 8, mixBlendMode: 'multiply' }} transform={common.transform} />;
      case 'tri':return <path d={`M${x} ${y - r} L${x + r} ${y + r} L${x - r} ${y + r} Z`} {...common} transform={`${common.transform} rotate(${rot} ${x} ${y})`} />;
      case 'wedge':return <path d={`M${x} ${y} L${x + r} ${y} A${r} ${r} 0 0 1 ${x} ${y + r} Z`} {...common} transform={`${common.transform} rotate(${rot} ${x} ${y})`} />;
      case 'bar':return <rect x={x - r} y={y - 7} width={r * 2} height={10 + rnd() * 14} rx="2" {...common} transform={`${common.transform} rotate(${rot} ${x} ${y})`} />;
      case 'wave':return <path d={`M${x - r} ${y} q ${r / 2} ${-r} ${r} 0 t ${r} 0`} fill="none" style={{ stroke: fill, strokeWidth: 6, strokeLinecap: 'round', mixBlendMode: 'multiply' }} transform={common.transform} />;
      default:return <g {...common}>{Array.from({ length: 5 }).map((_, i) => <circle key={i} cx={x - r + i * (r / 2)} cy={y} r={3.4} style={{ fill, mixBlendMode: 'multiply' }} />)}</g>;
    }
  };

  const layerA = Array.from({ length: 4 + Math.floor(rnd() * 2) });
  const layerB = Array.from({ length: 4 + Math.floor(rnd() * 2) });

  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className={`riso-img ${className}`} style={style} aria-hidden="true">
      <rect x="-4" y="-4" width="128" height="128" style={{ fill: 'var(--art-bg)', width: "83px" }} />
      <g>{layerB.map((_, i) => <g key={'b' + i}>{shape(B, 1.6)}</g>)}</g>
      <g>{layerA.map((_, i) => <g key={'a' + i}>{shape(A, -1.6)}</g>)}</g>
      <rect x="-4" y="-4" width="128" height="128" fill="url(#halftone)" opacity="0.5" />
    </svg>);

}

/* one shared halftone pattern def, dropped once at app root */
function RisoDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <pattern id="halftone" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <circle cx="1.2" cy="1.2" r="0.7" style={{ fill: 'var(--ink)' }} opacity="0.32" />
        </pattern>
      </defs>
    </svg>);

}

/* ---------- category line icons ---------- */
function CatIcon({ id, size = 22 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (id) {
    case 'draw':return <svg {...p}><path d="M4 20s2-1 4-1 3 1 5 1 4-1 4-1" /><path d="M14 4l6 6-9 9-6 1 1-6z" /></svg>;
    case 'know':return <svg {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h13" /><path d="M9 7h6M9 11h6" /></svg>;
    case 'code':return <svg {...p}><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 5l-2 14" /></svg>;
    case 'sport':return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 2.5 3 15.5 0 18M12 3c-3 2.5-3 15.5 0 18" /></svg>;
    case 'tabletop':return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1.3" /><circle cx="16" cy="16" r="1.3" /><circle cx="16" cy="8" r="1.3" /><circle cx="8" cy="16" r="1.3" /></svg>;
    case 'member':return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-5-5.9" /></svg>;
    default:return null;
  }
}

/* ---------- auto-scroll marquee (vertical or horizontal) ---------- */
function Marquee({ direction = 'vertical', durationSec = 40, gap = 14, className = '', children }) {
  const [paused, setPaused] = useState(false);
  const vertical = direction === 'vertical';
  const items = React.Children.toArray(children);
  const track = (key) =>
  <div className="mq-track-half" key={key} style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap }} aria-hidden={key === 'b'}>
      {items.map((c, i) => <div key={i} className="mq-cell">{c}</div>)}
    </div>;

  return (
    <div className={`mq ${vertical ? 'mq-v' : 'mq-h'} ${className}`}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mq-track" style={{
        flexDirection: vertical ? 'column' : 'row', gap,
        animationName: vertical ? 'mq-up' : 'mq-left',
        animationDuration: durationSec + 's',
        animationPlayState: paused ? 'paused' : 'running'
      }}>
        {track('a')}
        {track('b')}
      </div>
    </div>);

}

/* ---------- modal / lightbox overlay ---------- */
function Overlay({ open, onClose, children, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ov-scrim" onClick={onClose}>
      <div className={`ov-card ${wide ? 'ov-wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="ov-close" onClick={onClose} aria-label="關閉">✕</button>
        {children}
      </div>
    </div>);

}

/* ---------- small bits ---------- */
function Pill({ children, tone = 'ink', className = '', ...rest }) {
  return <span className={`pill pill-${tone} ${className}`} {...rest}>{children}</span>;
}

Object.assign(window, { mulberry32, RisoImage, RisoDefs, CatIcon, Marquee, Overlay, Pill, INK_VAR });