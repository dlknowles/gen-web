const fs = require("node:fs/promises");
const path = require("node:path");

const TEXT_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".css", ".md", ".txt", ".yml", ".yaml"
]);

/**
 * Replace tokens in text files under a directory.
 * @param {string} dir
 * @param {Record<string, string>} tokens
 */
async function replaceTokensInDir(dir, tokens) {
  async function walk(p) {
    const entries = await fs.readdir(p, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(p, entry.name);

      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }

      if (!entry.isFile()) continue;

      const ext = path.extname(entry.name).toLowerCase();
      if (!TEXT_EXTS.has(ext)) continue;

      let content = await fs.readFile(full, "utf-8");
      for (const [key, val] of Object.entries(tokens)) {
        content = content.split(key).join(val);
      }
      await fs.writeFile(full, content, "utf-8");
    }
  }

  await walk(dir);
}

module.exports = { replaceTokensInDir };
