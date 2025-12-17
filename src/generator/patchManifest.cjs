const fs = require("node:fs/promises");
const path = require("node:path");

/**
 * Read and parse a patch manifest.
 * @param {string} patchDir
 * @returns {Promise<{ id: string, overwrites: string[], adds: string[] }>}
 */
async function readPatchManifest(patchDir) {
  const manifestPath = path.join(patchDir, "patch.json");
  const raw = await fs.readFile(manifestPath, "utf-8");

  const parsed = JSON.parse(raw);

  // Basic defensive defaults
  return {
    id: parsed.id || "unknown",
    overwrites: Array.isArray(parsed.overwrites) ? parsed.overwrites : [],
    adds: Array.isArray(parsed.adds) ? parsed.adds : []
  };
}

module.exports = { readPatchManifest };
