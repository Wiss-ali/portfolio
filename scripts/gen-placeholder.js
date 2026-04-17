// Generates a 512x512 dark-gradient circle PNG placeholder for the Hero.
// Run: node scripts/gen-placeholder.js
const fs = require("fs");
const zlib = require("zlib");

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crc]);
}

const W = 512;
const H = 512;

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const rowLen = 1 + W * 4;
const raw = Buffer.alloc(H * rowLen);
const cx = W / 2;
const cy = H / 2;
const radius = Math.min(W, H) / 2 - 6;

for (let y = 0; y < H; y++) {
  const rowOff = y * rowLen;
  raw[rowOff] = 0; // filter: none
  for (let x = 0; x < W; x++) {
    const p = rowOff + 1 + x * 4;
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > radius) {
      raw[p] = 0;
      raw[p + 1] = 0;
      raw[p + 2] = 0;
      raw[p + 3] = 0;
      continue;
    }
    const t = d / radius;
    // dark purple → near-black gradient
    const r = Math.floor(35 + (1 - t) * 35);
    const g = Math.floor(20 + (1 - t) * 20);
    const b = Math.floor(55 + (1 - t) * 45);
    raw[p] = r;
    raw[p + 1] = g;
    raw[p + 2] = b;
    raw[p + 3] = 255;
  }
}

const idat = zlib.deflateSync(raw);
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/robot-head.png", png);
console.log("wrote public/robot-head.png", png.length, "bytes");
