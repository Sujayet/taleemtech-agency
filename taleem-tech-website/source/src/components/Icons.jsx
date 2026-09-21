const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

const paths = {
  code: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13.5 5-3 14" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  film: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M3 15h18M8 4v16M16 4v16" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 1.5-2.2-.5-1.2.3-2.3 1.6-2.3H17a4 4 0 0 0 4-4C21 6.8 17 3 12 3Z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="10" r="1" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 17.5 9 5 9-5" opacity=".5" /></>,
  store: <><path d="M4 9.5 5.5 4h13L20 9.5" /><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" /><path d="M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  menu: <><path d="M4 8h16M4 16h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  check: <><path d="m5 12.5 4.5 4.5L19 7.5" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></>,
};

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      {paths[name]}
    </svg>
  );
}
