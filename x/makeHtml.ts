import path from "node:path"

import fs from "fs-extra"
import yaml from "yaml"

const srcBaseDir = path.join(import.meta.dir, "..", "src")
const outputDir = path.join(import.meta.dir, "..", "out", "html")

const getNewestId = async (): Promise<string> => {
  const folders = await fs.readdir(srcBaseDir) as string[]
  const sorted = folders.toSorted(Bun.semver.order)
  return sorted.at(-1)!
}

const id = process.argv[2] || await getNewestId()
const srcDir = path.join(srcBaseDir, id)

await fs.mkdir(outputDir, {recursive: true})

const hashEntryId = (entryId: string): string => {
  const hash = Bun.hash.rapidhash(entryId).toString(16)
  return hash.slice(0, 8)
}

const changesPath = path.join(srcDir, "changes.txt")
const changesContent = await fs.readFile(changesPath, "utf8")

const headersPath = path.join(srcDir, "headers.yml")
const headersContent = await fs.readFile(headersPath, "utf8")
const headersData = yaml.parse(headersContent)
const headersJson = JSON.stringify(headersData, null, 2)

const sievesPath = path.join(srcDir, "sieves.yml")
const sievesContent = await fs.readFile(sievesPath, "utf8")
const sievesData = yaml.parse(sievesContent) as Record<string, Record<string, unknown>>

const jsDir = path.join(srcDir, "js")
const jsFields = ["res", "to", "url"] as const

for (const [entryId, entry] of Object.entries(sievesData)) {
  const hash = hashEntryId(entryId)
  const entryJsDir = path.join(jsDir, hash)
  try {
    const jsFiles = await fs.readdir(entryJsDir) as string[]
    for (const jsFile of jsFiles) {
      const fieldName = jsFile.replace(".js", "") as (typeof jsFields)[number]
      if (jsFields.includes(fieldName)) {
        const jsContent = await fs.readFile(path.join(entryJsDir, jsFile), "utf8")
        entry[fieldName] = `:${jsContent}`
      }
    }
  } catch {
    // No JS folder for this entry
  }
}

const sievesJson = JSON.stringify(sievesData, null, 2)

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Imagus Sieves - ${id}</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 20px;
      background: #000000ff;
      color: #e0e0e0;
    }
    h1 {
      margin: 0 0 20px;
      font-size: 1.5rem;
    }
    h2 {
      margin: 20px 0 10px;
      font-size: 1.2rem;
      color: #9090a0;
    }
    .code-container {
      position: relative;
      margin-bottom: 20px;
    }
    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 6px 12px;
      background: #3a3a4a;
      border: none;
      border-radius: 4px;
      color: #e0e0e0;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .copy-btn:hover {
      background: #4a4a5a;
    }
    .copy-btn.copied {
      background: #2a6a2a;
    }
    pre {
      background: #252530;
      border: 1px solid #3a3a4a;
      border-radius: 6px;
      padding: 16px;
      overflow-x: auto;
      margin: 0;
      max-height: 400px;
      overflow-y: auto;
    }
    code {
      font-family: "Fira Code", "JetBrains Mono", monospace;
      font-size: 0.9rem;
      line-height: 1.4;
      text-wrap-mode: wrap;
    }
  </style>
</head>
<body>
  <h1>Imagus Sieves - ${id}</h1>

  <h2>Changelog</h2>
  <div class="code-container">
    <pre><code>${escapeHtml(changesContent)}</code></pre>
  </div>

  <h2>sieves.json</h2>
  <div class="code-container">
    <button class="copy-btn" onclick="copyCode(this, 'sieves-code')">Copy</button>
    <pre><code id="sieves-code">${escapeHtml(sievesJson)}</code></pre>
  </div>

  <h2>headers.conf</h2>
  <div class="code-container">
    <button class="copy-btn" onclick="copyCode(this, 'headers-code')">Copy</button>
    <pre><code id="headers-code">${escapeHtml(headersJson)}</code></pre>
  </div>

  <script>
    async function copyCode(btn, codeId) {
      const code = document.getElementById(codeId).textContent;
      await navigator.clipboard.writeText(code);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    }
  </script>
</body>
</html>
`

await fs.writeFile(path.join(outputDir, "index.html"), html)
console.log(`Wrote index.html for ${id}`)

console.log("Done!")
