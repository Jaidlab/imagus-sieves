let m;
const html = new DOMParser().parseFromString($._, "text/html");
if($[1]==='video'){
m = html.querySelector('iframe[src]')?.src
return m&&m.length ? {loop:m} : ''
} else if ($[1]==='viewimage'){
m = html.querySelector('img[class="pure-img"]')
return [m.src.replace(/\/\d+full/,'/5000full'),m.alt]
}else{
return [...html.querySelector('div[id="customlistitems"]')?.querySelectorAll('img[class="pure-img"],img[loading="lazy"],img[class="whiteshelfimage"],img[src^="https://collage"]')].map(i=>[i.src.replace(/\d+full/,'5000full').replace(/\?.*$/,'').replace(/(image\/products\/)\d+/,'$15000'),[...new Set([i.alt,i.parentNode.parentNode.querySelector('div[class="text listnote"],div[class="listsettitle2"]')?.innerText.replace(/[\n\t]/g,'')])].filter(Boolean).join(" | ")])
}