export default function PortableShell() {
  return (
    <>
      <svg
        className="psp-shell"
        viewBox="0 0 1000 440"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="psp-chrome" x2="0.15" y2="1">
            <stop stopColor="#f7f8fa" />
            <stop offset=".22" stopColor="#747c85" />
            <stop offset=".49" stopColor="#e3e6e9" />
            <stop offset=".7" stopColor="#525960" />
            <stop offset=".88" stopColor="#f5f5f3" />
            <stop offset="1" stopColor="#7b828b" />
          </linearGradient>
          <linearGradient id="psp-face" x2=".35" y2="1">
            <stop stopColor="#28292c" />
            <stop offset=".25" stopColor="#08090c" />
            <stop offset=".6" stopColor="#101114" />
            <stop offset="1" stopColor="#07080b" />
          </linearGradient>
          <linearGradient id="psp-glass" x2="0" y2="1">
            <stop stopColor="#ffffff" stopOpacity=".09" />
            <stop offset=".6" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M110 14 Q119 7 151 7 H849 Q880 7 890 14 L938 20 Q956 23 966 53 Q998 119 998 223 Q998 326 966 389 Q957 410 937 413 L885 417 Q880 434 855 434 H145 Q119 434 114 417 L61 413 Q43 410 33 387 Q2 322 2 223 Q2 122 33 54 Q45 23 62 20 Z"
          fill="url(#psp-chrome)"
          stroke="#a0a5ab"
          strokeWidth="2"
        />
        <path
          d="M135 8 H865 Q883 8 887 25 L940 33 Q953 36 960 57 Q988 131 988 224 Q988 321 960 380 Q951 398 931 398 L883 398 Q878 420 855 422 H145 Q123 420 117 398 L68 398 Q47 398 39 379 Q12 315 12 224 Q12 131 40 57 Q48 36 61 33 L113 25 Q119 8 135 8 Z"
          fill="url(#psp-face)"
          stroke="#52545a"
          strokeWidth="2"
        />
        <path d="M181 21 H819 V369 H181 Z" fill="#050608" />
        <path d="M193 18 H806" stroke="#55565a" strokeWidth="1" />
        <path
          d="M180 23 H820 V374 H180 Z"
          fill="#090a0c"
          stroke="#393b40"
          strokeWidth="2"
        />
        <path
          d="M48 63 Q55 44 71 42 H173 V356 L42 358 Q23 310 23 221 Q23 131 48 63 Z"
          fill="url(#psp-glass)"
        />
        <path
          d="M829 42 H929 Q945 44 952 63 Q977 131 977 221 Q977 310 958 358 H829 Z"
          fill="url(#psp-glass)"
        />
        <path
          d="M124 398 Q500 410 875 398"
          fill="none"
          stroke="#73777d"
          strokeWidth="2"
        />
        <path
          d="M45 383 Q67 380 97 390 L93 407 Q68 410 46 398 Z M906 390 Q932 380 955 383 L954 398 Q933 410 909 407 Z"
          fill="#111318"
          stroke="#e1e4e6"
          strokeWidth="2"
        />
        <path
          d="M145 428 H855"
          stroke="#363b42"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg className="psp-wordmark" viewBox="0 0 180 36" aria-hidden="true">
        <path
          d="M3 31 V5 H44 V18 H3 M108 5 H65 V18 H108 V31 H65 M132 31 V5 H176 V18 H132"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
