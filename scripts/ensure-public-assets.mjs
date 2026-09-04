import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

// The Cloudflare Vite environment intentionally disables Vite's public-dir
// copy. Keep the supplied image library available to the Worker build anyway.
const projectRoot = process.cwd();
const source = path.join(projectRoot, "public", "assets");
const destination = path.join(projectRoot, "dist", "client", "assets");

if (existsSync(source)) {
  mkdirSync(destination, { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
  console.log(`Copied public assets to ${path.relative(projectRoot, destination)}`);
}
