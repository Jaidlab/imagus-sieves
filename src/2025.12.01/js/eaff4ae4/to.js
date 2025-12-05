const file_id = this.node?.closest("div[data-preview-file-key]")?.getAttribute("data-preview-file-key");
const res = `${this.node.baseURI}?file=${file_id}`
return file_id && res;