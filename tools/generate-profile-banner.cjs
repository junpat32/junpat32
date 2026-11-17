// Install Sharp with `npm install --no-save sharp`, then run this file with Node.js.
// The artwork is drawn from equations and SVG primitives. Sharp rasterizes and encodes it.
const path = require('node:path');
const sharp = require('sharp');

const width = 1200;
const height = 288;
const frameCount = 60;
const frameDelay = 90;
const assets = path.resolve(__dirname, '../assets');
const pointsPerLine = 96;
const rows = 28;

function ridge(value, center, span) {
  return Math.exp(-(((value - center) / span) ** 2));
}

function project(u, v) {
  const amplitude = Math.sin(Math.PI * (0.11 + 0.81 * u));
  const main = 186 * ridge(u, 0.77 - 0.14 * v, 0.213) * ridge(v, 0.42, 0.57);
  const shoulder = 76 * ridge(u, 0.39 + 0.12 * v, 0.153) * ridge(v, 0.79, 0.46);
  const ripple = 10 * amplitude * Math.sin(14 * u + 6 * v);
  const elevation = 266 + 103 * v - 58 * u - amplitude * (main + shoulder) - ripple;
  return [
    557 + 599 * u + 108 * (v - 0.5),
    0.78 * elevation - 20,
  ];
}

function trace(sample, count = pointsPerLine) {
  return Array.from({ length: count + 1 }, (_, index) => sample(index / count));
}

function pathData(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

const contours = Array.from({ length: rows + 1 }, (_, row) => trace(u => project(u, row / rows)));
const surface = pathData([...contours[0], ...contours.at(-1).slice().reverse()]) + ' Z';
const mesh = contours.map((points, index) => {
  const emphasis = index % 7 === 0;
  return `<path d="${pathData(points)}" stroke-width="${emphasis ? 1.55 : 0.8}" opacity="${emphasis ? 0.84 : 0.37}"/>`;
}).join('\n');
const crossSections = Array.from({ length: 21 }, (_, index) => {
  const points = trace(v => project((index + 1) / 22, v), 32);
  return `<path d="${pathData(points)}"/>`;
}).join('\n');

const nodes = [
  { u: 0.33, v: 0.56 },
  { u: 0.49, v: 0.51 },
  { u: 0.66, v: 0.43 },
  { u: 0.84, v: 0.39 },
  { u: 0.94, v: 0.45 },
].map(({ u, v }) => project(u, v));

function svg(phase = 0) {
  // The light starts and finishes beyond the drawing, so the loop has a quiet seam.
  const sweep = 440 + 850 * phase;
  const pulse = Math.sin(Math.PI * phase) ** 2;
  const nodeMarkup = nodes.map(([x, y]) => {
    const glow = pulse * ridge(x, sweep, 68);
    return `<circle cx="${x}" cy="${y}" r="${4.6 + 3.6 * glow}" fill="#ead4a2" opacity="${0.12 + 0.26 * glow}"/>
      <circle cx="${x}" cy="${y}" r="${2.3 + 0.8 * glow}" fill="#f3dfa7" opacity="${0.73 + 0.27 * glow}"/>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title">
  <title id="title">Patrick Wong, AI and Data Engineering</title>
  <defs>
    <linearGradient id="ink" x2="1" y2="0.7" gradientUnits="objectBoundingBox">
      <stop stop-color="#0c1618"/><stop offset="0.57" stop-color="#0d1c1e"/><stop offset="1" stop-color="#0b2b29"/>
    </linearGradient>
    <radialGradient id="halo" cx="80%" cy="37%" r="62%">
      <stop stop-color="#286757" stop-opacity="0.4"/><stop offset="1" stop-color="#123a34" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0v24" fill="none" stroke="#7db6a4" stroke-width="0.55" opacity="0.24"/>
    </pattern>
    <linearGradient id="grid-fade">
      <stop offset="0.36" stop-color="black"/><stop offset="0.73" stop-color="white"/>
    </linearGradient>
    <mask id="grid-mask"><rect width="${width}" height="${height}" fill="url(#grid-fade)"/></mask>
    <linearGradient id="surface" x1="486" y1="222" x2="1130" y2="54" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0d2423"/><stop offset="0.25" stop-color="#124339"/><stop offset="0.68" stop-color="#18664e"/>
      <stop offset="0.87" stop-color="#237962"/><stop offset="1" stop-color="#12382e"/>
    </linearGradient>
    <linearGradient id="trace" x1="476" x2="1190" gradientUnits="userSpaceOnUse">
      <stop stop-color="#55a18b" stop-opacity="0.03"/><stop offset="0.43" stop-color="#68b194" stop-opacity="0.73"/>
      <stop offset="0.78" stop-color="#b5e3c1"/><stop offset="1" stop-color="#64aa92"/>
    </linearGradient>
    <linearGradient id="highlight" x1="${sweep - 112}" x2="${sweep + 110}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c3f2ca" stop-opacity="0"/><stop offset="0.50" stop-color="#d5efb4" stop-opacity="${0.70 * pulse}"/>
      <stop offset="0.59" stop-color="#f1db96" stop-opacity="${0.47 * pulse}"/><stop offset="1" stop-color="#f1db96" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="banner-clip"><rect width="${width}" height="${height}" rx="22"/></clipPath>
  </defs>
  <g clip-path="url(#banner-clip)">
    <rect width="${width}" height="${height}" fill="url(#ink)"/>
    <rect width="${width}" height="${height}" fill="url(#halo)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)" mask="url(#grid-mask)"/>
    <path d="${surface}" fill="url(#surface)" opacity="0.92"/>
    <g fill="none" stroke="url(#trace)" stroke-width="0.60" opacity="0.43">${crossSections}</g>
    <g fill="none" stroke="url(#trace)">${mesh}</g>
    <g fill="none" stroke="url(#highlight)">${mesh}</g>
    ${nodeMarkup}
    <path d="M64 65h52" stroke="#8abd9e" stroke-width="2"/>
    <text x="60" y="152" font-family="Georgia, Constantia, serif" font-size="77" font-weight="bold" letter-spacing="-2.8" fill="#f7efdd">Patrick Wong</text>
    <text x="64" y="206" font-family="Segoe UI, sans-serif" font-size="34" font-weight="500" fill="#b4d9c7">AI &amp; Data Engineering</text>
    <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="21.5" fill="none" stroke="#8fc5b3" opacity="0.30"/>
  </g>
</svg>`;
}

async function generate() {
  await sharp(Buffer.from(svg())).png().toFile(path.join(assets, 'profile-banner-contours.png'));

  const channels = 4;
  const frameSize = width * height * channels;
  const frames = Buffer.allocUnsafe(frameSize * frameCount);
  for (let frame = 0; frame < frameCount; frame++) {
    const phase = frame / (frameCount - 1);
    const rendered = await sharp(Buffer.from(svg(phase))).ensureAlpha().raw().toBuffer();
    rendered.copy(frames, frame * frameSize);
  }

  await sharp(frames, { raw: { width, height: height * frameCount, channels, pageHeight: height } })
    .gif({ loop: 0, delay: Array(frameCount).fill(frameDelay), effort: 5, dither: 0, interFrameMaxError: 0, interPaletteMaxError: 256 })
    .toFile(path.join(assets, 'profile-banner-contours.gif'));
}

generate().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
