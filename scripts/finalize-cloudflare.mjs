// Post-build step: make the Nitro-generated Cloudflare Worker config
// deploy-ready (stable worker name + nodejs_compat for node: imports).
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const CONFIG_PATH = "dist/server/wrangler.json";
const WORKER_NAME = process.env.CLOUDFLARE_WORKER_NAME || "csifans";

if (!existsSync(CONFIG_PATH)) {
  console.warn(`[finalize-cloudflare] ${CONFIG_PATH} not found — skipping.`);
  process.exit(0);
}

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));

config.name = WORKER_NAME;
const flags = new Set(config.compatibility_flags ?? []);
flags.add("nodejs_compat");
config.compatibility_flags = [...flags];

writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
console.log(
  `[finalize-cloudflare] name="${config.name}" flags=[${config.compatibility_flags.join(", ")}]`,
);
