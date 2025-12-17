const fs = require("node:fs/promises");
const path = require("node:path");
const { readPatchManifest } = require("./patchManifest.cjs");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function applyPatch(patchDir, targetDir) {
  const manifest = await readPatchManifest(patchDir);

  async function walkAndApply(dir, relBase = "") {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(dir, entry.name);
      const relPath = path.join(relBase, entry.name);

      // ignore patch metadata/docs
      if (relPath === "patch.json" || relPath.toLowerCase() === "readme.md") continue;

      if (entry.isDirectory()) {
        await walkAndApply(srcPath, relPath);
        continue;
      }

      if (!entry.isFile()) continue;

      const dstPath = path.join(targetDir, relPath);
      const dstAlreadyExists = await exists(dstPath);

      if (dstAlreadyExists) {
        const relPathNormalized = relPath.replace(/\\/g, "/");
        const allowed = Array.isArray(manifest.overwrites) && manifest.overwrites.includes(relPathNormalized);

        if (!allowed) {
          throw new Error(
            `Patch "${manifest.id}" tried to overwrite "${relPathNormalized}" but it is not listed in patch.json overwrites.`
          );
        }
      } else {
        // ensure parent dirs exist
        await fs.mkdir(path.dirname(dstPath), { recursive: true });
      }

      await fs.copyFile(srcPath, dstPath);
    }
  }

  await walkAndApply(patchDir);
}

module.exports = { applyPatch };
