// Install Sharp with `npm install --no-save sharp`, then run this file with Node.js.
// Each illustration is drawn from SVG shapes and rendered as a still image and a GIF.
const path = require('node:path');
const { writeFile } = require('node:fs/promises');
const sharp = require('sharp');

const width = 1200;
const height = 228;
const frameCount = 40;
const assets = path.resolve(__dirname, '../assets');
const palette = {
  ink: '#0c1618', deep: '#0b2b29', border: '#8fc5b3', ivory: '#f7efdd',
  sage: '#b4d9c7', emerald: '#68b194', gold: '#f3dfa7',
};

function pulseAt(phase, position) {
  return Math.sin(Math.PI * phase) ** 2 * Math.exp(-((phase - position) ** 2) / 0.021);
}

function trace(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

function marker(x, y, strength) {
  return `<circle cx="${x}" cy="${y}" r="${6 + 4 * strength}" fill="${palette.gold}" opacity="${0.15 + 0.21 * strength}"/>
    <circle cx="${x}" cy="${y}" r="3" fill="${palette.gold}"/>`;
}

function fastIllustration(phase) {
  // An illustrative forecast fan, drawn from a centreline and widening intervals.
  const start = 800;
  const span = 325;
  const points = Array.from({ length: 71 }, (_, index) => {
    const t = index / 70;
    return { x: start + span * t, y: 137 - 41 * t + 7 * Math.sin(5.3 * t) - 6 * Math.sin(10 * t) };
  });
  const interval = points.map((point, index) => [point.x, point.y - 55 * (index / 70) ** 1.35]);
  const lower = points.map((point, index) => [point.x, point.y + 55 * (index / 70) ** 1.35]);
  const lines = [-1, -0.66, -0.33, 0.33, 0.66, 1].map(factor => {
    const d = trace(points.map(({ x, y }, index) => [x, y + 55 * factor * (index / 70) ** 1.35]));
    return `<path d="${d}" fill="none" stroke="${palette.emerald}" opacity="${Math.abs(factor) === 1 ? 0.6 : 0.36}"/>`;
  }).join('\n');
  const point = points[Math.min(70, Math.round(70 * phase))];
  const light = Math.sin(Math.PI * phase) ** 2;
  const end = points.at(-1);
  return `<path d="${trace([...interval, ...lower.reverse()])} Z" fill="${palette.emerald}" opacity="0.13"/>
    ${lines}
    <path d="M711 151 L731 146 L751 149 L769 130 L788 144 L800 137" fill="none" stroke="${palette.emerald}" stroke-width="2.1"/>
    <path d="${trace(points.map(({ x, y }) => [x, y]))}" fill="none" stroke="${palette.sage}" stroke-width="1.8" stroke-dasharray="6 5"/>
    <path d="M800 46V182" stroke="${palette.sage}" opacity="0.32" stroke-dasharray="3 6"/>
    ${marker(start, 137, 0)}
    ${marker(end.x, end.y, 0)}
    <g opacity="${light}">
      <path d="M${point.x} 47V182" stroke="${palette.gold}" opacity="0.36"/>
      ${marker(point.x, point.y, light)}
    </g>`;
}

function qualityIllustration(phase) {
  const firstX = 728;
  const secondX = 965;
  const top = 51;
  const tableWidth = 162;
  const rowHeight = 25;
  const rowOrder = [0, 2, 3, 1];
  const rowY = index => top + 32 + index * rowHeight;
  function tableAt(x, order) {
    const rows = order.map((key, index) => {
      const y = rowY(index);
      return `<path d="M${x} ${y - 13}h${tableWidth}" stroke="${palette.emerald}" opacity="0.22"/>
        <rect x="${x + 15}" y="${y - 3}" width="26" height="6" rx="3" fill="${palette.emerald}" opacity="0.75"/>
        <rect x="${x + 60}" y="${y - 3}" width="${38 + 10 * (key % 3)}" height="6" rx="3" fill="${palette.sage}" opacity="0.42"/>
        <circle cx="${x + 144}" cy="${y}" r="3" fill="${key === 1 ? palette.gold : palette.emerald}"/>`;
    }).join('\n');
    return `<rect x="${x}" y="${top}" width="${tableWidth}" height="122" rx="10" fill="#153632" stroke="${palette.emerald}" stroke-opacity="0.63"/>
      <path d="M${x + 16} ${top + 10}h41" stroke="${palette.sage}" stroke-width="3" stroke-linecap="round"/>
      ${rows}`;
  }
  const links = rowOrder.map((key, target) => {
    const source = rowY(key);
    const destination = rowY(target);
    const glow = pulseAt(phase, 0.23 + key * 0.17);
    const line = `M${firstX + tableWidth} ${source}C918 ${source} 935 ${destination} ${secondX} ${destination}`;
    return `<path d="${line}" fill="none" stroke="${key === 1 ? palette.gold : palette.emerald}" stroke-width="${1.4 + 1.8 * glow}" opacity="${0.43 + 0.56 * glow}"/>`;
  }).join('\n');
  return `${links}${tableAt(firstX, [0, 1, 2, 3])}${tableAt(secondX, rowOrder)}`;
}

function pipelineIllustration(phase) {
  const inputFiles = [53, 123].map(y => `
    <path d="M755 ${y}h40l16 16v33a6 6 0 0 1 -6 6h-50a6 6 0 0 1 -6 -6v-43a6 6 0 0 1 6 -6Z"
      fill="#153632" stroke="${palette.emerald}" stroke-opacity="0.78"/>
    <path d="M795 ${y}v11a5 5 0 0 0 5 5h11 M763 ${y + 26}h30 M763 ${y + 37}h23"
      fill="none" stroke="${palette.sage}" stroke-opacity="0.66" stroke-linecap="round"/>`).join('\n');

  const routes = [
    { path: 'M811 80H835Q846 80 851 90L858 103Q864 114 878 114H889', color: palette.emerald, arrival: 0.22 },
    { path: 'M811 150H835Q846 150 851 140L858 126Q864 114 878 114H889', color: palette.emerald, arrival: 0.37 },
    { path: 'M953 114H1016', color: palette.gold, arrival: 0.68 },
  ].map(route => {
    const glow = pulseAt(phase, route.arrival);
    return `<path d="${route.path}" fill="none" stroke="${route.color}" stroke-linecap="round"
      stroke-width="${1.7 + 2.1 * glow}" opacity="${0.54 + 0.46 * glow}"/>`;
  }).join('\n');

  const reportBars = [22, 35, 29, 47].map((barHeight, index) => {
    const color = index === 3 ? palette.gold : palette.emerald;
    return `<rect x="${1031 + index * 20}" y="${144 - barHeight}" width="11" height="${barHeight}" rx="2"
      fill="${color}" opacity="${0.67 + 0.33 * pulseAt(phase, 0.69 + 0.06 * index)}"/>`;
  }).join('\n');

  return `${routes}${inputFiles}
    <rect x="889" y="82" width="64" height="64" rx="13" fill="#153632" stroke="${palette.emerald}" stroke-opacity="0.78"/>
    <rect x="889" y="82" width="64" height="64" rx="13" fill="${palette.emerald}" opacity="${0.44 * pulseAt(phase, 0.51)}"/>
    <path d="M907 113l10 10 18 -19" fill="none" stroke="${palette.gold}" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="1016" y="63" width="109" height="102" rx="10" fill="#153632" stroke="${palette.emerald}" stroke-opacity="0.78"/>
    <path d="M1031 81h37 M1031 144h78" stroke="${palette.sage}" stroke-opacity="0.62" stroke-linecap="round"/>
    ${reportBars}`;
}

function layoutIllustration(phase) {
  const tiles = Array.from({ length: 6 }, (_, column) => {
    const x = 757 + column * 63;
    const y = 90 - column * 4;
    const selected = column === 1 || column === 4;
    const glow = pulseAt(phase, 0.15 + column * 0.14);
    return Array.from({ length: 4 }, (_, index) => {
      const row = 3 - index;
      const top = y + row * 21;
      const emphasis = selected && row === 0;
      const line = emphasis ? palette.gold : palette.emerald;
      const face = `M${x} ${top}l29 -12 44 12 -29 12Z`;
      const side = `M${x + 44} ${top + 12}l29 -12v14l-29 12Z`;
      const front = `M${x} ${top}l44 12v14l-44 -12Z`;
      return `<path d="${side}" fill="#12342d" stroke="${line}" stroke-opacity="0.42"/>
        <path d="${front}" fill="#1b4740" stroke="${line}" stroke-opacity="0.55"/>
        <path d="${face}" fill="#286457" stroke="${line}" stroke-opacity="0.83"/>
        <path d="${face}" fill="${palette.gold}" opacity="${row === 0 ? glow * 0.74 : 0}"/>`;
    }).join('\n');
  }).join('\n');
  return `<path d="M716 166l112 -46 301 28 -108 47Z" fill="#1a3a32" opacity="0.5"/>
    <path d="M716 166l112 -46 301 28 -108 47Z" fill="none" stroke="${palette.emerald}" opacity="0.31"/>
    ${tiles}`;
}

const projects = [
  { name: 'fast', title: 'FAST', subtitle: 'Explainable risk modelling', size: 71, illustration: fastIllustration, pause: 1370, hold: 760 },
  { name: 'data-quality-monitor', title: 'Data Quality Monitor', subtitle: 'Reusable rules and evidence comparison', size: 57, illustration: qualityIllustration, pause: 2600, hold: 810 },
  { name: 'data-pipeline-toolkit', title: 'Data Pipeline Toolkit', subtitle: 'Recurring deliveries and reporting', size: 57, illustration: pipelineIllustration, pause: 3100, hold: 810 },
  { name: 'layoutlab', title: 'LayoutLab', subtitle: 'Parquet layout and SQL performance', size: 66, illustration: layoutIllustration, pause: 3540, hold: 800 },
];

function card(project, phase = 0) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="ink"><stop stop-color="${palette.ink}"/><stop offset="0.55" stop-color="#0d1c1e"/><stop offset="1" stop-color="${palette.deep}"/></linearGradient>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="${palette.border}" stroke-width="0.55" opacity="0.32"/></pattern>
    <linearGradient id="fade"><stop offset="0.45" stop-color="black"/><stop offset="0.80" stop-color="white"/></linearGradient>
    <mask id="grid-fade"><rect width="${width}" height="${height}" fill="url(#fade)"/></mask>
    <clipPath id="edge"><rect width="${width}" height="${height}" rx="22"/></clipPath>
  </defs>
  <g clip-path="url(#edge)">
    <rect width="${width}" height="${height}" fill="url(#ink)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)" mask="url(#grid-fade)"/>
    ${project.illustration(phase)}
    <path d="M65 54h43" stroke="${palette.emerald}" stroke-width="2"/>
    <text x="60" y="124" font-family="Georgia, Constantia, serif" font-size="${project.size}" font-weight="bold" letter-spacing="-1.8" fill="${palette.ivory}">${project.title}</text>
    <text x="64" y="172" font-family="Segoe UI, sans-serif" font-size="32" font-weight="500" fill="${palette.sage}">${project.subtitle}</text>
    <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="21.5" fill="none" stroke="${palette.border}" opacity="0.30"/>
  </g>
</svg>`;
}

function divider() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="30" viewBox="0 0 1200 30">
  <path d="M0 15H540M660 15H1200" stroke="${palette.emerald}" stroke-opacity="0.50"/>
  <path d="M552 15h16c12 0 20 -9 32 -9s20 9 32 9h16M552 15h16c12 0 20 9 32 9s20 -9 32 -9h16" fill="none" stroke="${palette.emerald}" stroke-width="1.5"/>
  <circle cx="600" cy="15" r="3.8" fill="#ad8947"/>
</svg>`;
}

async function generateCard(project) {
  const filename = path.join(assets, `${project.name}-contours`);
  await sharp(Buffer.from(card(project))).png().toFile(`${filename}.png`);

  const channels = 4;
  const frameSize = width * height * channels;
  const frames = Buffer.allocUnsafe(frameSize * frameCount);
  const delay = Array(frameCount).fill(110);
  delay[0] = project.pause;
  delay[frameCount - 1] = project.hold;
  for (let frame = 0; frame < frameCount; frame++) {
    const phase = frame / (frameCount - 1);
    const rendered = await sharp(Buffer.from(card(project, phase))).ensureAlpha().raw().toBuffer();
    rendered.copy(frames, frame * frameSize);
  }

  await sharp(frames, { raw: { width, height: height * frameCount, channels, pageHeight: height } })
    .gif({ loop: 0, delay, effort: 5, dither: 0, interFrameMaxError: 0, interPaletteMaxError: 256 })
    .toFile(`${filename}.gif`);
}

async function generate() {
  for (const project of projects) {
    await generateCard(project);
  }
  await writeFile(path.join(assets, 'profile-divider.svg'), divider() + '\n');
}

generate().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
