// Ícones de linha e ilustrações botânicas desenhados para o site.
// Traço fino e cor herdada (currentColor), no mesmo desenho das folhas existentes.

const paths = {
  // Áreas de atuação
  bag: 'M5.5 8.5h13l-1 11.5h-11zM9 8.5V7a3 3 0 0 1 6 0v1.5M9.5 12a2.5 2.5 0 0 0 5 0',
  home: 'M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5.5h4V20',
  bank: 'M3.5 9 12 4.5 20.5 9zM5.5 9v8.5M9.5 9v8.5M14.5 9v8.5M18.5 9v8.5M3.5 20h17',
  hourglass: 'M7 3.5h10M7 20.5h10M8 3.5c0 4 4 5.5 4 8.5s-4 4.5-4 8.5M16 3.5c0 4-4 5.5-4 8.5s4 4.5 4 8.5M9.5 18h5',
  receipt: 'M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3zM9 8h6M9 11.5h6M9 15h3.5',
  contract: 'M14 3.5H6.5v17h11V7zM14 3.5V7h3.5M9 10.5h6M9 13.5h3M8.5 17.5c1.2-1.5 2-1.6 2.6-.4.5 1 1.2 1 2.4-.4M15 17h1.5',
  // Princípios
  ear: 'M8 9.5a4.5 4.5 0 0 1 9 0c0 3-2.5 3.6-3 6-.4 2.2-1.6 4-3.6 4A2.4 2.4 0 0 1 8 17.4M10.5 9.8a2 2 0 0 1 4 .2c0 1.4-1.3 1.6-1.5 3',
  dialogue: 'M3.5 5.5h10v7h-5l-3 2.5v-2.5h-2zM16.5 9.5h4v7h-2V19l-3-2.5h-5v-1.5',
  community: 'M12 8.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4zM6 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 19.5v-3.5a4 4 0 0 1 8 0v3.5M3 19.5V17a3 3 0 0 1 4.5-2.6M21 19.5V17a3 3 0 0 0-4.5-2.6',
  // Etapas do atendimento
  mail: 'M3.5 6h17v12h-17zM4.5 7l7.5 6 7.5-6',
  listen: 'M4 5.5h16v10.5h-9l-4 3.5V16H4zM8 10.8h.01M12 10.8h.01M16 10.8h.01',
  steps: 'M4 19.5h4v-4h4v-4h4v-4h4M16 4.5h4v4',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 28, className = '' }: { name: IconName; size?: number; className?: string }) {
  return <svg className={`line-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={paths[name]} stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

/** Ramo com folhas alternadas ao longo de uma curva. Usado como ilustração decorativa. */
export function Branch({ className = '', leaves = 9, flip = false }: { className?: string; leaves?: number; flip?: boolean }) {
  // Curva do caule: Bézier cúbica de baixo para cima.
  const p0 = [40, 380], p1 = [70, 270], p2 = [150, 170], p3 = [190, 20];
  const point = (t: number) => {
    const u = 1 - t;
    return [0, 1].map(i => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]);
  };
  const angle = (t: number) => {
    const [x1, y1] = point(Math.max(0, t - .01)), [x2, y2] = point(Math.min(1, t + .01));
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  };
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = .12 + i * (.84 / (leaves - 1));
    const [x, y] = point(t);
    const side = i % 2 === 0 ? 1 : -1;
    const size = 1.15 - t * .5;
    return { x, y, rotate: angle(t) + side * 52, size, key: i };
  });
  return <svg className={`branch ${className}`} viewBox="0 0 230 400" fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d={`M${p0} C${p1} ${p2} ${p3}`} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    {items.map(leaf => <g key={leaf.key} transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.rotate.toFixed(1)}) scale(${leaf.size.toFixed(2)})`}>
      <path d="M0 0C10-13 34-15 50 0 34 15 10 13 0 0Z" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M2 0H44M16 0l7-5M28 0l7-5M16 0l7 5M28 0l7 5" stroke="currentColor" strokeWidth=".7" strokeLinecap="round" opacity=".7" />
    </g>)}
  </svg>;
}
