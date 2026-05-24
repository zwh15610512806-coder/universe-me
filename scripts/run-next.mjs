import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const cwd = process.cwd();
const wasmDir = path.join(cwd, "node_modules", "@next", "swc-wasm-nodejs");

process.env.NEXT_SWC_PATH ??= path.join(cwd, ".next-swc-cache");

try {
  require.resolve("@next/swc-wasm-nodejs/wasm.js");
  process.env.NEXT_TEST_WASM_DIR ??= wasmDir;
} catch {
  // Fall back to the platform SWC binary when the optional WASM package is absent.
}

const nextBin = require.resolve("next/dist/bin/next");
process.argv = [process.argv[0], nextBin, ...process.argv.slice(2)];
require(nextBin);
