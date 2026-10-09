// Hand-drawn brand illustrations: navy ink, highlighter yellow, sky blue.
const INK = "#14213D";
const MARK = "#FFE14D";
const SKY = "#DCEBFF";
const SKY2 = "#C6DBF7";
const PAPER = "#FFFFFF";

export function KidsIllustration() {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-labelledby="kids-ill" className="ill">
      <title id="kids-ill">An open picture book with one line of text highlighted as it is read aloud</title>
      <rect width="480" height="300" rx="22" fill={SKY} />
      {/* stars */}
      <path d="M62 58l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill={MARK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M418 46l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* book shadow */}
      <path d="M92 236 L240 252 L388 236 L388 250 L240 266 L92 250 Z" fill={SKY2} />
      {/* left page */}
      <path d="M96 88 Q168 72 240 96 L240 248 Q168 226 96 240 Z" fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      {/* right page */}
      <path d="M240 96 Q312 72 384 88 L384 240 Q312 226 240 248 Z" fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      {/* picture on left page: hill, sun, little house */}
      <clipPath id="leftpage">
        <path d="M100 92 Q168 77 236 99 L236 243 Q168 223 100 236 Z" />
      </clipPath>
      <g clipPath="url(#leftpage)">
        <circle cx="198" cy="128" r="16" fill={MARK} stroke={INK} strokeWidth="3" />
        <path d="M96 214 Q150 168 240 200 L240 250 L96 250 Z" fill={SKY2} stroke={INK} strokeWidth="3" />
        <path d="M128 178 h34 v26 h-34 z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M122 180 L145 160 L168 180" fill={MARK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="141" y="189" width="9" height="15" fill={INK} />
      </g>
      {/* text lines on right page, one highlighted */}
      <rect x="262" y="118" width="98" height="14" rx="4" fill={MARK} />
      <path d="M266 125 h28 M300 125 h22 M328 125 h28" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M266 152 h40 M312 152 h44" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      <path d="M266 176 h24 M296 176 h34 M336 176 h18" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      <path d="M266 200 h46 M318 200 h30" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      {/* spine */}
      <path d="M240 96 L240 248" stroke={INK} strokeWidth="4" />
      {/* sound waves coming off the highlighted line */}
      <path d="M394 112 q10 13 0 26 M408 102 q18 23 0 46" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function GrownupsIllustration() {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-labelledby="grown-ill" className="ill">
      <title id="grown-ill">A letter with reading glasses on it, and a phone reading the letter aloud</title>
      <rect width="480" height="300" rx="22" fill={SKY} />
      {/* envelope behind */}
      <g transform="rotate(-8 150 170)">
        <rect x="58" y="104" width="200" height="130" rx="8" fill={SKY2} stroke={INK} strokeWidth="4" />
        <path d="M58 112 L158 176 L258 112" fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
      {/* letter */}
      <g transform="rotate(4 210 160)">
        <rect x="118" y="52" width="176" height="210" rx="6" fill={PAPER} stroke={INK} strokeWidth="4" />
        <path d="M140 84 h70" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <path d="M140 112 h128 M140 132 h112 M140 152 h124 M140 172 h96 M140 192 h120" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        <rect x="136" y="203" width="120" height="16" rx="4" fill={MARK} />
        <path d="M140 211 h40 M186 211 h30 M222 211 h28" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <path d="M140 238 h60" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
      </g>
      {/* reading glasses resting on the letter */}
      <g transform="rotate(-10 200 150)">
        <circle cx="168" cy="150" r="27" fill="rgba(220,235,255,0.55)" stroke={INK} strokeWidth="5" />
        <circle cx="232" cy="150" r="27" fill="rgba(220,235,255,0.55)" stroke={INK} strokeWidth="5" />
        <path d="M195 148 q5 -7 10 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M141 146 l-26 -14 M259 146 l24 -16" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* phone */}
      <g transform="rotate(6 370 170)">
        <rect x="318" y="74" width="108" height="196" rx="18" fill={INK} />
        <rect x="327" y="88" width="90" height="168" rx="10" fill={PAPER} />
        <circle cx="372" cy="140" r="24" fill={INK} />
        <path d="M365 128 L385 140 L365 152 Z" fill={MARK} />
        {/* waveform */}
        <path d="M340 200 v10 M350 194 v22 M360 198 v14 M370 190 v30 M380 196 v18 M390 192 v26 M400 199 v12" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <rect x="340" y="232" width="64" height="8" rx="4" fill={MARK} />
      </g>
    </svg>
  );
}
