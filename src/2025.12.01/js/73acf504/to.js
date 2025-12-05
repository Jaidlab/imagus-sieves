const show_thumbs_as_album = true
const start_album_at_hovered_image = true

const n=this.node;
if(show_thumbs_as_album&&/^(?:js-hotel-thumb|bh-photo-)/.test(n.parentNode?.className||n.className||'')){
let m=(n.parentNode?.className||n.className||'').startsWith('js-hotel-thumb') ? [...n.parentNode.parentNode?.querySelectorAll('img')||[]].map(i=>i.src?.replace(/(?:square\d+|max\d+(?:x\d+)?)/,'max2048x2048')) : [...document.documentElement.outerHTML.matchAll(/highres_url:\s*'([^']+)/g)].map(i=>i[1]);
if(start_album_at_hovered_image)m=m.slice(m.findIndex(i=>RegExp($[2].match(/^[^?]+/)[0]).test(i)));
return m?.length ? '//booking_album/'+$[1]+'!'+m.join("!") : `${$[1]}/max2048x2048/${$[2]}`
}
return `${$[1]}/max2048x2048/${$[2]}`