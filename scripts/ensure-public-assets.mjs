import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

// The Cloudflare Vite environment intentionally disables Vite's public-dir
// copy. Keep the supplied image library available to the Worker build anyway.
const projectRoot = process.cwd();
const source = path.join(projectRoot, "public", "assets");
const destination = path.join(projectRoot, "dist", "client", "assets");

if (existsSync(path.join(projectRoot, 'lib', 'asset-manifest.json'))) {
  console.log('Images served directly from object storage; local originals are not copied into deployment.');
} else if (existsSync(source)) {
  mkdirSync(destination, { recursive: true });
  // Copy explicitly: recursive cpSync exits abnormally on this Windows runtime.
  const copyDirectory = (from, to) => {
    mkdirSync(to, { recursive: true });
    for (const entry of readdirSync(from, { withFileTypes: true })) {
      const input = path.join(from, entry.name);
      const output = path.join(to, entry.name);
      if (entry.isDirectory()) copyDirectory(input, output);
      else if (entry.isFile()) copyFileSync(input, output);
    }
  };
  copyDirectory(source, destination);
  console.log(`Copied public assets to ${path.relative(projectRoot, destination)}`);
}
