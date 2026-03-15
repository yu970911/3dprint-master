export default function FactIcon({ type }: { type: string }) {
  const s = { width: 36, height: 36 };
  const c = "#64B5F6";

  if (type === "book") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <rect x="6" y="5" width="20" height="26" rx="3" fill="#1565C0" opacity="0.3" stroke={c} strokeWidth="1.5"/>
      <rect x="10" y="5" width="16" height="26" rx="2" fill="#1E3A6E" stroke={c} strokeWidth="1.5"/>
      <line x1="13" y1="12" x2="23" y2="12" stroke={c} strokeWidth="1.2" opacity="0.6"/>
      <line x1="13" y1="16" x2="23" y2="16" stroke={c} strokeWidth="1.2" opacity="0.6"/>
      <line x1="13" y1="20" x2="20" y2="20" stroke={c} strokeWidth="1.2" opacity="0.6"/>
      <path d="M8 5 L8 31" stroke={c} strokeWidth="2" opacity="0.8"/>
    </svg>
  );

  if (type === "spool") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="13" fill="#2D1B69" stroke={c} strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="8"  fill="#7B2FBE" opacity="0.7" stroke="#CE93D8" strokeWidth="1"/>
      <circle cx="18" cy="18" r="4"  fill="#1a1a3e"/>
      {[0,60,120,180,240,300].map(d=>(
        <line key={d}
          x1={18+4*Math.cos(d*Math.PI/180)} y1={18+4*Math.sin(d*Math.PI/180)}
          x2={18+8*Math.cos(d*Math.PI/180)} y2={18+8*Math.sin(d*Math.PI/180)}
          stroke="#CE93D8" strokeWidth="1.2" opacity="0.6"/>
      ))}
      <text x="18" y="33" textAnchor="middle" fontSize="6" fill={c} fontFamily="monospace">PLA</text>
    </svg>
  );

  if (type === "house") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <polygon points="18,4 32,16 4,16" fill="#1565C0" opacity="0.5" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="7" y="15" width="22" height="17" rx="1" fill="#1E3A6E" stroke={c} strokeWidth="1.5"/>
      <rect x="15" y="22" width="6" height="10" rx="1" fill="#0D47A1" stroke={c} strokeWidth="1"/>
      <rect x="9"  y="18" width="5" height="5" rx="1" fill="#1565C0" stroke={c} strokeWidth="1" opacity="0.8"/>
      <rect x="22" y="18" width="5" height="5" rx="1" fill="#1565C0" stroke={c} strokeWidth="1" opacity="0.8"/>
    </svg>
  );

  if (type === "calendar") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <rect x="4" y="8" width="28" height="24" rx="3" fill="#1E3A6E" stroke={c} strokeWidth="1.5"/>
      <rect x="4" y="8" width="28" height="9"  rx="3" fill="#1565C0" opacity="0.6"/>
      <line x1="4" y1="17" x2="32" y2="17" stroke={c} strokeWidth="1" opacity="0.5"/>
      <circle cx="11" cy="7" r="2.5" fill="#1E3A6E" stroke={c} strokeWidth="1.5"/>
      <circle cx="25" cy="7" r="2.5" fill="#1E3A6E" stroke={c} strokeWidth="1.5"/>
      <text x="18" y="14" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace" opacity="0.9">1984</text>
      {[[9,23],[14,23],[19,23],[24,23],[29,23],[9,28],[14,28],[19,28]].map(([px,py],i)=>(
        <circle key={i} cx={px} cy={py} r="1.5" fill={c} opacity="0.5"/>
      ))}
    </svg>
  );

  if (type === "rocket") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <path d="M18,3 C18,3 26,8 26,18 L18,28 L10,18 C10,8 18,3 18,3Z" fill="#1565C0" stroke={c} strokeWidth="1.5"/>
      <circle cx="18" cy="16" r="4" fill="#42A5F5" opacity="0.4" stroke={c} strokeWidth="1"/>
      <path d="M10,18 L5,25 L10,23Z" fill="#7B2FBE" opacity="0.7" stroke="#CE93D8" strokeWidth="1"/>
      <path d="M26,18 L31,25 L26,23Z" fill="#7B2FBE" opacity="0.7" stroke="#CE93D8" strokeWidth="1"/>
      <path d="M14,28 Q18,32 22,28" stroke="#FF9800" strokeWidth="2" fill="none" opacity="0.8"/>
      <circle cx="18" cy="30" r="2" fill="#FFD700" opacity="0.6"/>
    </svg>
  );

  if (type === "heart") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <path d="M18,30 C18,30 4,22 4,13 C4,8.5 7.5,5 12,5 C14.5,5 16.8,6.5 18,8.5 C19.2,6.5 21.5,5 24,5 C28.5,5 32,8.5 32,13 C32,22 18,30 18,30Z" fill="#1565C0" opacity="0.4" stroke={c} strokeWidth="1.5"/>
      <path d="M18,26 C18,26 8,20 8,14 C8,11 10,9 12.5,9 C14,9 15.5,10 16.5,11.5" stroke={c} strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );

  if (type === "rainbow") return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <path d="M4,26 Q4,10 18,10 Q32,10 32,26" stroke="#F44336" strokeWidth="2.5" fill="none" opacity="0.8"/>
      <path d="M7,26 Q7,13 18,13 Q29,13 29,26" stroke="#FF9800" strokeWidth="2" fill="none" opacity="0.8"/>
      <path d="M10,26 Q10,16 18,16 Q26,16 26,26" stroke="#FFD700" strokeWidth="2" fill="none" opacity="0.8"/>
      <path d="M13,26 Q13,19 18,19 Q23,19 23,26" stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M16,26 Q16,22 18,22 Q20,22 20,26" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8"/>
    </svg>
  );

  // default: nozzle
  return (
    <svg {...s} viewBox="0 0 36 36" fill="none">
      <rect x="10" y="4" width="16" height="12" rx="3" fill="#1E3A6E" stroke={c} strokeWidth="1.5"/>
      <polygon points="10,16 26,16 22,28 14,28" fill="#1565C0" stroke={c} strokeWidth="1.5"/>
      <rect x="14" y="27" width="8" height="5" rx="2" fill="#42A5F5" stroke={c} strokeWidth="1"/>
      <circle cx="18" cy="33" r="2" fill="#64B5F6"/>
    </svg>
  );
}
