import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = fileURLToPath(new URL("../", import.meta.url));
const buildDir = join(projectDir, ".output-azure");
if (!existsSync(join(buildDir, "server/index.mjs"))) {
  throw new Error("Run bun run build:azure before packaging.");
}
const info = JSON.parse(readFileSync(join(buildDir, "nitro.json"), "utf8"));
if (info.preset !== "node-server") {
  throw new Error("The Azure package must contain a node-server build.");
}
writeFileSync(
  join(buildDir, "package.json"),
  JSON.stringify(
    {
      name: "skillup-southafrica-deployment",
      private: true,
      type: "module",
      engines: { node: "24.x" },
      scripts: { start: "node server/index.mjs" },
    },
    null,
    2,
  ) + "\n",
);

const deployDir = join(projectDir, ".deploy");
mkdirSync(deployDir, { recursive: true });
const archive = join(deployDir, "skillup-southafrica-azure.zip");
rmSync(archive, { force: true });
// Package only the compiled runtime. Local secrets and project history stay out.
const result = spawnSync("zip", ["-q", "-r", archive, "server", "public", "package.json"], {
  cwd: buildDir,
  stdio: "inherit",
});
if (result.error) console.error("Packaging requires the zip command:", result.error.message);
process.exitCode = result.status ?? 1;
if (process.exitCode === 0)
  console.log("Azure deployment package: .deploy/skillup-southafrica-azure.zip");
