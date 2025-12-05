let m=[...$._.matchAll(/file:\s*"([^"]+\.mp4[^"]*)/g)].map(i=>i[1]);
if(m.length)return [[['#'+m.pop(),m?.pop()]]];
return [...$._.matchAll(/<a href="([^"]+)"\s+class="picture/g)].map(i=>[i[1]]);