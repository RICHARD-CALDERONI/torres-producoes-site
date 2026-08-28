#!/usr/bin/env node
// Recompresses PNG assets embedded in a Claude Design "bundled page" export
// (the __bundler/manifest script tag) as WebP, in place. Re-run this after
// every fresh export from the design project.
//
// Usage: node scripts/optimize-images.js <path/to/index.html>

const sharp = require('sharp');
const fs = require('fs');

const [, , target] = process.argv;
if (!target) {
  console.error('Usage: node scripts/optimize-images.js <path/to/index.html>');
  process.exit(1);
}

const MANIFEST_TAG = '<script type="__bundler/manifest">';
const QUALITY_OPAQUE = 80;
const QUALITY_ALPHA = 85;

async function main() {
  const content = fs.readFileSync(target, 'utf8');
  const start = content.indexOf(MANIFEST_TAG);
  if (start === -1) throw new Error('No __bundler/manifest script tag found — is this a bundled export?');
  const s2 = start + MANIFEST_TAG.length;
  const end = content.indexOf('</script>', s2);
  const manifest = JSON.parse(content.slice(s2, end));

  let before = 0;
  let after = 0;

  for (const entry of Object.values(manifest)) {
    if (entry.mime !== 'image/png') continue;
    const buf = Buffer.from(entry.data, 'base64');
    before += buf.length;

    const stats = await sharp(buf).stats();
    const alpha = stats.channels[stats.channels.length - 1];
    const hasRealAlpha = stats.channels.length === 4 && (alpha.min !== 255 || alpha.max !== 255);

    let img = sharp(buf);
    if (!hasRealAlpha) img = img.flatten({ background: '#ffffff' });
    const webp = await img.webp({ quality: hasRealAlpha ? QUALITY_ALPHA : QUALITY_OPAQUE, effort: 6 }).toBuffer();

    if (webp.length < buf.length) {
      after += webp.length;
      entry.mime = 'image/webp';
      entry.data = webp.toString('base64');
    } else {
      after += buf.length; // recompression made it bigger — keep original
    }
  }

  const newContent = content.slice(0, s2) + JSON.stringify(manifest) + content.slice(end);
  fs.writeFileSync(target, newContent, 'utf8');

  const pct = before ? (100 * (1 - after / before)).toFixed(1) : '0.0';
  console.log(`Images: ${before.toLocaleString()} -> ${after.toLocaleString()} bytes (-${pct}%)`);
  console.log(`Wrote ${target} (${fs.statSync(target).size.toLocaleString()} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
