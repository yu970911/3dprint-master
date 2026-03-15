"use client";
import { useEffect, useRef } from "react";

export default function PrinterIllustration({ size = 200 }: { size?: number }) {
  const headRef = useRef<SVGGElement>(null);
  const dropRef = useRef<SVGCircleElement>(null);
  const rafRef  = useRef<number>(0);
  const posRef  = useRef({ x: 60, dir: 1 });

  useEffect(() => {
    let t = 0;
    function tick() {
      t++;
      const p = posRef.current;
      p.x += p.dir * 0.8;
      if (p.x > 130) p.dir = -1;
      if (p.x < 60)  p.dir =  1;

      if (headRef.current) {
        headRef.current.setAttribute("transform", `translate(${p.x - 95}, 0)`);
      }
      if (dropRef.current) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.12);
        dropRef.current.setAttribute("r", String(2.5 + pulse));
        dropRef.current.setAttribute("opacity", String(0.6 + 0.4 * pulse));
        dropRef.current.setAttribute("cx", String(p.x));
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>
        <linearGradient id="bedGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0a1a30" />
        </linearGradient>
        <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#455A64" />
          <stop offset="100%" stopColor="#263238" />
        </linearGradient>
        <linearGradient id="spoolGrad" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#7B2FBE" />
          <stop offset="100%" stopColor="#4A148C" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Outer Frame ── */}
      {/* Left vertical rod */}
      <rect x="22" y="30" width="8" height="155" rx="4" fill="#1a3a60" />
      <rect x="24" y="30" width="4" height="155" rx="2" fill="#2155a0" opacity="0.6" />
      {/* Right vertical rod */}
      <rect x="170" y="30" width="8" height="155" rx="4" fill="#1a3a60" />
      <rect x="172" y="30" width="4" height="155" rx="2" fill="#2155a0" opacity="0.6" />
      {/* Top bar */}
      <rect x="18" y="24" width="164" height="14" rx="7" fill="url(#frameGrad)" />
      {/* Top highlight */}
      <rect x="22" y="25" width="156" height="4" rx="2" fill="white" opacity="0.12" />

      {/* ── X-axis Rail ── */}
      <rect x="26" y="50" width="148" height="6" rx="3" fill="#37474F" />
      <rect x="26" y="50" width="148" height="2" rx="1" fill="white" opacity="0.15" />

      {/* ── Print Head (animated) ── */}
      <g ref={headRef} transform="translate(0, 0)">
        {/* Head body */}
        <rect x="78" y="46" width="34" height="22" rx="5" fill="url(#headGrad)" />
        <rect x="80" y="47" width="30" height="7" rx="3" fill="white" opacity="0.08" />
        {/* Fan circle */}
        <circle cx="84" cy="57" r="6" fill="#1a2a3a" />
        <circle cx="84" cy="57" r="4" fill="#263238" />
        <line x1="84" y1="53" x2="84" y2="55" stroke="#546E7A" strokeWidth="1.2"/>
        <line x1="84" y1="59" x2="84" y2="61" stroke="#546E7A" strokeWidth="1.2"/>
        <line x1="80" y1="57" x2="82" y2="57" stroke="#546E7A" strokeWidth="1.2"/>
        <line x1="86" y1="57" x2="88" y2="57" stroke="#546E7A" strokeWidth="1.2"/>
        {/* Nozzle */}
        <polygon points="90,68 100,68 97,80 93,80" fill="#78909C" />
        <rect x="93" y="78" width="4" height="4" rx="1" fill="#90A4AE" />
        {/* Heat block */}
        <rect x="88" y="62" width="14" height="8" rx="2" fill="#B71C1C" opacity="0.85" />
        <rect x="89" y="63" width="12" height="2" rx="1" fill="#EF5350" opacity="0.4" />
      </g>

      {/* ── Filament drop (animated) ── */}
      <circle ref={dropRef} cx="95" cy="90" r="2.5" fill="#64B5F6" filter="url(#glow)" />

      {/* ── Printed object (growing layers) ── */}
      <rect x="60" y="148" width="80" height="8" rx="2" fill="#1565C0" opacity="0.7" />
      <rect x="64" y="140" width="72" height="8" rx="2" fill="#1976D2" opacity="0.75" />
      <rect x="68" y="132" width="64" height="8" rx="2" fill="#1E88E5" opacity="0.8" />
      <rect x="72" y="124" width="56" height="8" rx="2" fill="#2196F3" opacity="0.85" />
      <rect x="76" y="116" width="48" height="8" rx="2" fill="#42A5F5" opacity="0.9" />
      {/* Top layer shine */}
      <rect x="78" y="117" width="44" height="2" rx="1" fill="white" opacity="0.2" />

      {/* ── Heated Bed ── */}
      <rect x="30" y="156" width="140" height="14" rx="6" fill="url(#bedGrad)" />
      <rect x="32" y="157" width="136" height="5" rx="3" fill="#2196F3" opacity="0.15" />
      {/* Bed grid lines */}
      {[50, 70, 90, 110, 130, 150].map((x) => (
        <line key={x} x1={x} y1="157" x2={x} y2="169" stroke="#2196F3" strokeWidth="0.5" opacity="0.3" />
      ))}
      {/* Bed label */}
      <text x="100" y="166" textAnchor="middle" fontSize="6" fill="#64B5F6" opacity="0.7" fontFamily="monospace">HEAT BED</text>

      {/* ── Base ── */}
      <rect x="20" y="170" width="160" height="10" rx="5" fill="#0D1B2A" />
      <rect x="20" y="170" width="160" height="3" rx="3" fill="white" opacity="0.05" />

      {/* ── Filament Spool ── */}
      <circle cx="168" cy="90" r="22" fill="#1a1a3e" />
      <circle cx="168" cy="90" r="18" fill="#2D1B69" />
      <circle cx="168" cy="90" r="12" fill="#7B2FBE" opacity="0.8" />
      <circle cx="168" cy="90" r="7"  fill="#1a1a3e" />
      <circle cx="168" cy="90" r="4"  fill="#0a0a20" />
      {/* Spool spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={168 + 7 * Math.cos((deg * Math.PI) / 180)}
          y1={90  + 7 * Math.sin((deg * Math.PI) / 180)}
          x2={168 + 12 * Math.cos((deg * Math.PI) / 180)}
          y2={90  + 12 * Math.sin((deg * Math.PI) / 180)}
          stroke="#9C27B0" strokeWidth="1.5" opacity="0.6"
        />
      ))}
      {/* Spool label */}
      <text x="168" y="120" textAnchor="middle" fontSize="5.5" fill="#CE93D8" opacity="0.8" fontFamily="monospace">PLA</text>

      {/* Filament wire from spool to head */}
      <path d="M155,82 Q130,60 110,56" stroke="#CE93D8" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3,3" />

      {/* ── Front panel / screen ── */}
      <rect x="68" y="176" width="36" height="22" rx="4" fill="#0D1B2A" />
      <rect x="70" y="178" width="32" height="18" rx="3" fill="#0a2040" />
      {/* Screen glow */}
      <rect x="71" y="179" width="30" height="16" rx="2" fill="#1565C0" opacity="0.15" />
      <text x="86" y="188" textAnchor="middle" fontSize="5" fill="#64B5F6" fontFamily="monospace">100%</text>
      <text x="86" y="194" textAnchor="middle" fontSize="4" fill="#42A5F5" fontFamily="monospace" opacity="0.7">PRINTING</text>

      {/* ── Status LED ── */}
      <circle cx="115" cy="180" r="3" fill="#4CAF50" filter="url(#glow)" />
      <circle cx="125" cy="180" r="3" fill="#FF9800" opacity="0.7" />

      {/* ── Corner brackets ── */}
      {[[26,32],[166,32],[26,175],[166,175]].map(([bx, by], i) => (
        <g key={i}>
          <circle cx={bx} cy={by} r="4" fill="#37474F" />
          <circle cx={bx} cy={by} r="2" fill="#546E7A" />
        </g>
      ))}
    </svg>
  );
}
