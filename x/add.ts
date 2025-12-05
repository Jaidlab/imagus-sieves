import path from "node:path"

import fs from "fs-extra"
import {temporaryDirectoryTask} from "tempy"
import yauzl from "yauzl"
import {toYaml} from "zeug"

const inputPath = process.argv[2]
if (!inputPath) {
  console.error("Usage: bun x/add <folder_or_zip>")
  process.exit(1)
}

const outputDir = path.join(import.meta.dir, "..", "src", "new")
const jsOutputDir = path.join(outputDir, "js")
await fs.mkdir(outputDir, {recursive: true})
await fs.mkdir(jsOutputDir, {recursive: true})

const hashEntryId = (entryId: string): string => {
  const hash = Bun.hash.rapidhash(entryId).toString(16)
  return hash.slice(0, 8)
}

const extractJsSnippets = async (data: Record<string, Record<string, unknown>>): Promise<Record<string, Record<string, unknown>>> => {
  const result: Record<string, Record<string, unknown>> = {}
  for (const [entryId, entry] of Object.entries(data)) {
    const processedEntry: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(entry)) {
      if ((key === "res" || key === "to" || key === "url") && typeof value === "string" && value.startsWith(":")) {
        const jsContent = value.slice(1).trim()
        const hash = hashEntryId(entryId)
        const entryJsDir = path.join(jsOutputDir, hash)
        await fs.mkdir(entryJsDir, {recursive: true})
        const jsFileName = `${key}.js`
        await fs.writeFile(path.join(entryJsDir, jsFileName), jsContent)
        console.log(`Wrote js/${hash}/${jsFileName}`)
      } else {
        processedEntry[key] = value
      }
    }
    result[entryId] = processedEntry
  }
  return result
}

const processFolder = async (folderPath: string) => {
  const files = await fs.readdir(folderPath) as string[]
  const txtFile = files.find(file => file.endsWith(".txt"))
  const confFile = files.find(file => file.endsWith(".conf"))
  const jsonFile = files.find(file => file.endsWith(".json"))
  if (!txtFile) {
    console.error("No .txt file found in folder")
    process.exit(1)
  }
  if (!confFile) {
    console.error("No .conf file found in folder")
    process.exit(1)
  }
  if (!jsonFile) {
    console.error("No .json file found in folder")
    process.exit(1)
  }
  const txtContent = await fs.readFile(path.join(folderPath, txtFile), "utf8")
  await fs.writeFile(path.join(outputDir, "changes.txt"), txtContent)
  console.log(`Wrote changes.txt`)
  const confContent = await fs.readFile(path.join(folderPath, confFile), "utf8")
  const confData = JSON.parse(confContent as string)
  const confYaml = toYaml(confData)
  await fs.writeFile(path.join(outputDir, "headers.yml"), confYaml)
  console.log(`Wrote headers.yml`)
  const jsonContent = await fs.readFile(path.join(folderPath, jsonFile), "utf8")
  const jsonData = JSON.parse(jsonContent as string) as Record<string, Record<string, unknown>>
  const processedData = await extractJsSnippets(jsonData)
  const jsonYaml = toYaml(processedData)
  await fs.writeFile(path.join(outputDir, "sieves.yml"), jsonYaml)
  console.log(`Wrote sieves.yml`)
}

type YauzlZipFile = {
  readEntry: () => void
  on: (event: string, callback: (...args: any[]) => void) => void
  openReadStream: (entry: YauzlEntry, callback: (err: Error | null, stream: NodeJS.ReadableStream) => void) => void
  close: () => void
}

type YauzlEntry = {
  fileName: string
}

const unzipToFolder = async (zipPath: string, destPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, {lazyEntries: true}, (err: Error | null, zipFile: YauzlZipFile) => {
      if (err) {
        reject(err)
        return
      }
      const processNextEntry = () => {
        zipFile.readEntry()
      }
      zipFile.on("entry", (entry: YauzlEntry) => {
        if (entry.fileName.endsWith("/") || entry.fileName.includes("/")) {
          processNextEntry()
          return
        }
        zipFile.openReadStream(entry, (err, readStream) => {
          if (err) {
            reject(err)
            return
          }
          const chunks: Buffer[] = []
          readStream.on("data", (chunk: Buffer) => {
            chunks.push(chunk)
          })
          readStream.on("end", async () => {
            const content = Buffer.concat(chunks)
            const destFilePath = path.join(destPath, entry.fileName)
            await fs.writeFile(destFilePath, content)
            processNextEntry()
          })
          readStream.on("error", reject)
        })
      })
      zipFile.on("end", () => {
        zipFile.close()
        resolve()
      })
      zipFile.on("error", reject)
      processNextEntry()
    })
  })
}

const stat = await fs.stat(inputPath)
if (stat.isDirectory()) {
  await processFolder(inputPath)
} else if (inputPath.endsWith(".zip")) {
  await temporaryDirectoryTask(async tempDir => {
    await unzipToFolder(inputPath, tempDir)
    await processFolder(tempDir)
  })
} else {
  console.error("Input must be a folder or a .zip file")
  process.exit(1)
}

console.log("Done!")
