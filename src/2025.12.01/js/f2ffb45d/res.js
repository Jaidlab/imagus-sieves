let parser = new DOMParser();
let doc = parser.parseFromString($._, "text/html");
let images = doc.querySelector("article")?.querySelectorAll("div[class='attachmentList'] a.js-lbImage, ul[class='attachmentList'] a.js-lbImage");
let attach = doc.querySelector("article")?.querySelectorAll("a:has(img[class*='bbImage']):not([class='link link--internal']), span > img[class*='bbImage'][data-zoom-target='1']");
let genre = [...$._.matchAll(/Genre<\/b>:.+\n\n\n.+\n.+\n\n.+\n.+\n.+\n.+\n\n.*?>([^<]+)/gm)]
genre = genre.length > 0 ? genre[0][1] : 'nope';
let description = doc.querySelector('meta[property]')?.content||''
let res = [];
if(images?.length > 0){
[...images].map(e => res.push([e.href, `Tags: ${genre} | ${description.replaceAll('\n', ' | ')}`]));
} 
if(attach?.length > 0){
[...attach].map(e => res.push([e.href||e.src, `Tags: ${genre} | ${description.replaceAll('\n', ' | ')}`]));
}
return [...new Map(res)];