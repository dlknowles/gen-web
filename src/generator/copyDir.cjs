const fs = require("node:fs/promises");
const path = require("node:path");

/**
 * Copy a directory recursively.
 * @param {string} srcDir
 * @param {string} dstDir
 * @param {{ exclude?: (relPath: string) => boolean }} [opts]
 */
async function copyDir(srcDir, dstDir, opts = {}) {
  await fs.mkdir(dstDir, { recursive: true });

  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const dstPath = path.join(dstDir, entry.name);

    const relPath = entry.name;
    if (opts.exclude && opts.exclude(relPath)) continue;

    if (entry.isDirectory()) {
      await copyDir(srcPath, dstPath, opts);
    } else if (entry.isFile()) {
      await fs.mkdir(path.dirname(dstPath), { recursive: true });
      await fs.copyFile(srcPath, dstPath);
    }
  }
}

module.exports = { copyDir };
