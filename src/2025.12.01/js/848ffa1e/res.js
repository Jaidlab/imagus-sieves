if($[2])return $._.match(/data-video-src\s*=\s*"([^"]+)/)?.[1].replace(/^\/.+/,'//'+$[1]+'$&')||''
if(!this.ls)this.ls=0
if(!this.kino_teatr_album)this.kino_teatr_album=[]
const h=[...new DOMParser().parseFromString($._,"text/html").querySelector('div[class="grid_content photo_album wrap_cols_4 width_100"],div[class="big_content_block"]').children]
this.kino_teatr_album.push(...h.filter(i=>i.className==="block_wrap").map(i=>{i=i.firstChild.firstChild;return [i.src.replace('pv_',''),i.title]}))
this.ls++
if(h.some(i=>i.firstChild?.lastChild?.textContent==='>')&&this.ls<40)return {loop:h.find(i=>i.firstChild.lastChild.textContent==='>').firstChild.lastChild.href.replace(/\/$/,'')}
$=this.kino_teatr_album
delete this.kino_teatr_album, delete this.ls
if(!$.length)$=h[0]?.querySelector('img[src]')?.src||''
return $