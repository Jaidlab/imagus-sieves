import path from "node:path"

import fs from "fs-extra"
import yaml from "yaml"

const id = process.argv[2]
if (!id) {
  console.error("Usage: bun x/reconstruct <id>")
  process.exit(1)
}

const srcDir = path.join(import.meta.dir, "..", "src", id)
const outputDir = path.join(import.meta.dir, "..", "out", "reconstruct")
await fs.mkdir(outputDir, {recursive: true})

const hashEntryId = (entryId: string): string => {
  const hash = Bun.hash.rapidhash(entryId).toString(16)
  return hash.slice(0, 8)
}

const changesPath = path.join(srcDir, "changes.txt")
const changesContent = await fs.readFile(changesPath, "utf8")
await fs.writeFile(path.join(outputDir, `changes_${id}.txt`), changesContent)
console.log(`Wrote changes_${id}.txt`)

const headersPath = path.join(srcDir, "headers.yml")
const headersContent = await fs.readFile(headersPath, "utf8")
const headersData = yaml.parse(headersContent)
const headersJson = JSON.stringify(headersData)
await fs.writeFile(path.join(outputDir, `headers_${id}.conf`), headersJson)
console.log(`Wrote headers_${id}.conf`)

const sievesPath = path.join(srcDir, "sieves.yml")
const sievesContent = await fs.readFile(sievesPath, "utf8")
const sievesData = yaml.parse(sievesContent) as Record<string, Record<string, unknown>>

const jsDir = path.join(srcDir, "js")
const jsFields = ["res", "to", "url"] as const

for (const [entryId, entry] of Object.entries(sievesData)) {
  const hash = hashEntryId(entryId)
  const entryJsDir = path.join(jsDir, hash)
  try {
    const jsFiles = await fs.readdir(entryJsDir)
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

const sievesJson = JSON.stringify(sievesData)
await fs.writeFile(path.join(outputDir, `sieves_${id}.json`), sievesJson)
console.log(`Wrote sieves_${id}.json`)

console.log("Done!")
