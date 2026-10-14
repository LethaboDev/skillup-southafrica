import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectDir = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(process.execPath, ["node_modules/vite/bin/vite.js", "build"], {
  cwd: projectDir,
  stdio: "inherit",
  env: { ...process.env, SKILLUP_AZURE_BUILD: "1", NITRO_PRESET: "node-server" },
});
if (result.error) {
  console.error("Could not start the Azure build:", result.error.message);
}
process.exitCode = result.status ?? 1;
