let n=this.node;
n=$[2]&&n.srcset&&[...this.node.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.lastElementChild?.lastElementChild?.firstElementChild.children||[]].map(i=>i.firstElementChild.src?.replace(/-\d+/,'-image')).join("!");
return n?.length?'phoenarenaalbum/'+n:$[2]?`//${$[1]}${$[2]}image${$[4]}`:'//'+$[1]+$[3]+$[4]