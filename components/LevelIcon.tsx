export default function LevelIcon({ id, color, size = 44 }: { id: number; color: string; size?: number }) {
  const s = { width: size, height: size };

  if (id === 1) return (
    <svg {...s} viewBox="0 0 44 44" fill="none">
      <rect x="6" y="6" width="14" height="14" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <rect x="24" y="6" width="14" height="14" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <rect x="6" y="24" width="14" height="14" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <rect x="24" y="24" width="14" height="14" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="2"/>
      <path d="M28 31 L31 34 L36 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (id === 2) return (
    <svg {...s} viewBox="0 0 44 44" fill="none">
      <rect x="4" y="10" width="36" height="28" rx="4" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5"/>
      <rect x="8" y="14" width="20" height="16" rx="2" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2"/>
      <path d="M14 20 L22 20 M18 16 L18 24" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="32" cy="22" r="6" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M30 22 L32 24 L35 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (id === 3) return (
    <svg {...s} viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="16" fill={color} opacity="0.08" stroke={color} strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="10" fill={color} opacity="0.12" stroke={color} strokeWidth="1"/>
      {[0,45,90,135,180,225,270,315].map(d=>(
        <line key={d}
          x1={22+10*Math.cos(d*Math.PI/180)} y1={22+10*Math.sin(d*Math.PI/180)}
          x2={22+16*Math.cos(d*Math.PI/180)} y2={22+16*Math.sin(d*Math.PI/180)}
          stroke={color} strokeWidth="1" opacity="0.4"/>
      ))}
      <path d="M22 8 L22 22 L30 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="22" cy="22" r="2.5" fill={color}/>
    </svg>
  );

  if (id === 4) return (
    <svg {...s} viewBox="0 0 44 44" fill="none">
      <rect x="8" y="32" width="28" height="5" rx="2" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2"/>
      <rect x="12" y="26" width="20" height="6" rx="1.5" fill={color} opacity="0.4" stroke={color} strokeWidth="1"/>
      <rect x="14" y="20" width="16" height="6" rx="1.5" fill={color} opacity="0.55" stroke={color} strokeWidth="1"/>
      <rect x="16" y="14" width="12" height="6" rx="1.5" fill={color} opacity="0.7" stroke={color} strokeWidth="1"/>
      <rect x="18" y="8" width="8" height="6" rx="1.5" fill={color} opacity="0.9" stroke={color} strokeWidth="1.2"/>
      {/* nozzle */}
      <path d="M6 18 Q22 12 38 18" stroke={color} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="2,2"/>
      <circle cx="22" cy="12" r="2" fill={color} opacity="0.7"/>
    </svg>
  );

  // id === 5 — wrench/tools
  return (
    <svg {...s} viewBox="0 0 44 44" fill="none">
      <path d="M12 32 L26 18 C24 14 26 8 32 8 C35 8 37 10 37 10 L32 14 L30 12 L28 14 L30 16 L26 20 C30 22 36 20 36 24 C36 30 30 34 26 32 L12 32Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="8" y1="36" x2="16" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      <circle cx="10" cy="34" r="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2"/>
      <path d="M20 28 L28 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}
