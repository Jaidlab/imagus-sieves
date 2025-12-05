const show_thumbnail_gallery = true
const truncate_album = true

const n=this.node;
if(show_thumbnail_gallery&&n.className==="T75of B5GQxf"){
const num=n.attributes?.['data-screenshot-index']?.value;
return '//playstorealbum/'+$[1]+'!'+[...n.offsetParent?.querySelectorAll('img')].filter((i,n)=>n>=(truncate_album&&Number(num)||0)).map(i=>i.src.match(/^[^=]+=/)[0]).join('!')
}
return $[1]+'s0\n'+$[1]+'s1024'