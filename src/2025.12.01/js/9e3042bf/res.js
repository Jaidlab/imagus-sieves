max_resolution = 1080;

let media_urls=[...$._.matchAll(/<source src="([^"]+)" size="(\d+)">/g)];
media_urls=media_urls.filter(i=>Number(i[2])<=max_resolution).sort((a,b)=>Number(a[2])-Number(b[2])).map(i=>i[1]);
return media_urls.length ? [[['#'+media_urls.pop(),media_urls?.[0]],'']] : ''