const m = t => t?.includes('video') ? '#mp4' : t?.includes('audio') ? '#mp3' : '';
const a = i => [u+(i[p])+m(i[f]),i.name];
let d=$[2]==='d', f=d?'file_type':'mime_type', u='https://'+$[1]+'api/file'+(d?'system':'/'), p=d?'path':'id', o=$._.match(/window\.(?:initial_node|viewer_data)\s*=\s*({.+?});/), r=/(?:vide|audi)o|image/;
o=o&&JSON.parse(o[1]);
o=o ? d ? o.children?.length ? o.children : o.path?.pop() : o.api_response?.files||o.api_response : null;
if(Array.isArray(o))o=$[3] ? o[$[3]] : o.some(i=>r.test(i[f])) ? o.filter(i=>r.test(i[f])) : o.filter(i=>i.type==='dir');
if(o[f]==='application/pdf'){
this.TRG.IMGS_ext_data=[['',`<imagus-extension type="iframe" url="${`https://${$[1]}res/misc/pdf-viewer/web/viewer.html?file=%2Fapi%2Ffile%2F${o.id}`}"></imagus-extension>`]];
return {loop:'imagus://extension'};
}
return o&&Object.keys(o).length ? Array.isArray(o) ? d&&o.every(i=>i.type==='dir') ? noMedia('Directory contents:\n'+o.map(i=>i.name).join('\n')) : o.map(a) : (r.test(o[f]) ? a(o) : noMedia('File name: '+o.name)) : noMedia('No media')

function noMedia(t){
const h=42+((o?.length||0)*42), w=t.split('\n').sort((a,b)=>b.length-a.length)[0].length*21;
return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" height="${h}" width="${w}" style="background-color: #2a2a2a;">
<foreignObject height="100%" width="100%">
<div xmlns="http://www.w3.org/1999/xhtml" style="display: table; height: 100%; width: 100%;">
<span style="color: tomato; display: table-cell; font: 36px sans-serif; vertical-align: top; text-align: ${t[0]==='N'?'center':'left'}; white-space: pre-wrap;">${t}
</span>
</div>
</foreignObject>
</svg>`)
}